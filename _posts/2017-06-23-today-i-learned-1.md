---
post_title: 'Today I Learned #1'
author: dreat
layout: post
published: true
post_date: 2017-06-23 21:22:01
---
While using EntityFramework in my integration tests (which is a separate topic ;) ) I discovered quite interesting thing. I guess this may be obvious to some, but I learned Entity "the hard way" jumping into an app with Entity already in place and had to adapt - this was my first app with a database by the way.

So if you add entities to your context I'm used to adding all entities to context, so the code would look like
[csharp]
using (var ctx = new Context())
{
    var first = new FirstEntity { .. };
    var second = new SecondEntity { .. };

    ctx.FirstEntities.Add(first);
    ctx.SecondEntities.Add(second);
    ctx.SaveChanges();
}
[/csharp]

But if entities are related, you can safely do this
[csharp]
using (var ctx = new Context())
{
    var first = new FirstEntity { .. };
    var second = new SecondEntity { Relation = first };

    //this will also take care of the first one!
    ctx.SecondEntities.Add(second); 
    ctx.SaveChanges();
}
[/csharp]
Or even this!
[csharp]
using (var ctx = new Context())
{
    var second = new SecondEntity { Relation = new FirstEntity{ .. } };

    ctx.SecondEntities.Add(second);
    ctx.SaveChanges();
}
[/csharp]

It's nice and saves some typing! :)
