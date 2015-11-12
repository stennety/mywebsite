---
layout: post
title: 'Using MultipleOutputs with ORC in MapReduce'
---
## Introduction to ORC

ORC (Optimised Row Columnar) is a relatively new format being heavily pushed by the Hadoop community. It offers many useful optimisations and features for storing columnar data. Some of its key features include:
 - Predicate pushdown - only the columns you need are read into Hive queries, as opposed to the entire row,
 - MIN, MAX and SUM values of columns are stored within the data itself for rapid calculations,
 - Easy to use with Hive,
 - Small output files.

For more information on ORC, see [Owen O'Malley's Slideshare] or [Christian Prokopp's article]. For official documentation, see [Apache ORC LanguageManual].

I've been using it with a client as a potential [Apache Avro] replacement, and I've been very impressed so far. However, it is still quite young - even by Hadoop terms - and so there isn't a lot of content online for people wanting to use it. As such, I'll be posting tutorials for new uses.

## MapReduce MultipleOutputs with ORC Files

[HadoopCraft] has a great tutorial on using ORC as a MapReduce output. Outputting ORC files with more than one struct from a single MapReduce job is fairly straightforward, but requires some understanding of the ORC code.

Let's assume that we want to output two different datasets - one representing a cat and the other representing a person. The relevant parts of the Reducer class would look something like:

```java
public class MultipleORCReducer extends Reducer<Text, NullWritable, NullWritable, Writable> {
private static final String PERSON_OUTPUT_NAME = "personOut";
private static final String CAT_OUTPUT_NAME = "catOut";

private MultipleOutputs mOutputs;

private final OrcSerde orcSerde = new OrcSerde();
private List orcRecord;
private Writable row;

//ORC variables for the person
private final String personStruct = "struct<name:string,age:int>";
private final TypeInfo personTypeInfo = TypeInfoUtils.getTypeInfoFromTypeString(personStruct);
private final ObjectInspector personOip = TypeInfoUtils.getStandardJavaObjectInspectorFromTypeInfo(personTypeInfo);

//ORC variables for the cat
private final String catStruct = "struct<breed:string,colour:string>";
private final TypeInfo catTypeInfo = TypeInfoUtils.getTypeInfoFromTypeString(catStruct);
private final ObjectInspector catOip = TypeInfoUtils.getStandardJavaObjectInspectorFromTypeInfo(catTypeInfo);

@Override
protected void reduce(Text key Iterable values, Context context) {
	//For a person
	this.orcRecord = new ArrayList();
	this.orcRecord.add("Ben");
	this.orcRecord.add(25);
	this.row = orcSerde.serialize(this.orcRecord, personOip);
	this.mOutputs.write(PERSON_OUTPUT_NAME, NullWritable.get(), this.row);

	//For a cat
	this.orcRecord = new ArrayList();
	this.orcRecord.add("Tabby");
	this.orcRecord.add("ginger");
	this.row = orcSerde.serialize(this.orcRecord, atOip);
	this.mOutputs.write(CAT_OUTPUT_NAME, NullWritable.get(), this.row);
}

@Override
protected void setup(Context context) {
	this.mOutputs = new MultipleOutputs(context);
}

@Override
protected void cleanup(Context context) {
	this.mOutputs.close();
}
}
```
Notice that the only real difference between this and [HadoopCraft]'s tutorial for single outputs is that unique TypeInfo and ObjectInspector instances must be created for each different output.

The elements of the driver class related to outputs are:

```java
private void prepareJob(Configuration conf, Job job) {
  //...
  conf.set("orc.create.index","true");
  OrcNewOutputFormat.setCompressOutput(job,true);
  OrcNewOutputFormat.setOutputPath(job,"<hdfs-output-location");
  MultipleOutputs.addNamedOutput(job,PERSON_OUTPUT_NAME, OrcNewOutputFormat.class, NullWritable.class, Writable.class);
  MultipleOutputs.addNamedOutput(job,CAT_OUTPUT_NAME, OrcNewOutputFormat.class, NullWritable.class, Writable.class);
}
```
Again there's nothing crazy going on here, just three lines which should be included in any ORC MapReduce job, and then the usual `MultipleOutputs` commands.

[HadoopCraft]:http://hadoopcraft.blogspot.co.uk/2014/07/generating-orc-files-using-mapreduce.html
[Owen O'Malley's Slideshare]:http://www.slideshare.net/oom65/orc-files
[Christian Prokopp's article]:http://www.semantikoz.com/blog/orc-intelligent-big-data-file-format-hadoop-hive/
[Apache ORC LanguageManual]:https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC
[Apache Avro]:http://avro.apache.org/docs/1.7.7/gettingstartedjava.html
