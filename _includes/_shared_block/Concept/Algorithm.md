<center>

<div class="mermaid"> 
graph LR;
Algorithm;
Algorithm--->DataStructs;
Algorithm--->Complexity;
Algorithm--->UsingAlgorithmAndDatastruct;

DataStructs;
DataStructs--->Algorithm;
DataStructs--->Complexity;
DataStructs--->UsingAlgorithmAndDatastruct;

Complexity;
Complexity--->UsingAlgorithmAndDatastruct;

UsingAlgorithmAndDatastruct;
UsingAlgorithmAndDatastruct--->ProblemSolving;

ProblemSolving;
</div>

</center>

[문제를 계산하기 위해 알고리즘을 어떻게 생각해 내거나 기존 알고리즘을 찾아 적용하는 방법을 알 수 있습니까?](https://www.quora.com/How-do-I-come-up-with-algorithms-or-know-how-to-find-and-apply-existing-ones-for-computing-problems)   
[문제 해결 및 알고리즘](http://sofia.cs.vt.edu/cs1114-ebooklet/chapter4.html)

알고리즘은 **어떤 문제를 해결하기 위해 정해진 일련의 절차나 방법을 공식화한 형태로 표현한 것, 계산을 실행하기 위한 단계적 절차를 의미**합니다. 즉, 문제 해결에 필요한 계산 절차 또는 처리 과정의 순서를 뜻합니다.

* 알고리즘을 활용할 때 **이해는 반드시 필요하며 외우는 것보다는 빠르게 찾을 수 있는 능력이 더 중요합니다.** 

프로그래밍에는 문제를 해결하는 다양한 방법이 있습니다. 그러나 이러한 방법들의 효율성은 다양하게 나타납니다. 어떤 방법은 다른 방법들보다 더 정확한 결과를 제공하는데 더 적합합니다. 이때 알고리즘은 문제를 해결하는 최상의 방법을 찾는 데 도움을 줍니다.

다시 말해, 효율적인 코드를 작성하고 문제를 최적 또는 거의 최적으로 해결하기 위해 알고리즘을 활용하는 것은 매우 유용합니다. 알고리즘을 적용하면 다음과 같은 프로그램의 효율성 향상이 기대됩니다.

* 최적의 알고리즘을 사용하면 컴퓨터 프로그램이 매우 정확한 결과를 얻을 수 있습니다. 이로써 소프트웨어의 정확성을 향상시킬 수 있습니다.
* 알고리즘을 활용하여 프로그램이 문제를 빠르게 실행할 수 있도록 개선할 수 있습니다. 효율적인 알고리즘을 사용하면 문제 해결에 소요되는 시간을 줄일 수 있어, 실행 속도를 향상시킬 수 있습니다.
* 메모리 사용량은 선택한 알고리즘에 따라 다르게 나타납니다. 적절한 알고리즘 선택으로 프로그램이 최소한의 메모리를 사용하도록 만들 수 있습니다.

알고리즘의 특징은 다음과 같습니다.

|특성|설명|
|:-:|---|
|유한성|알고리즘의 단계들은 반드시 유한한 횟수를 거친 후에 종료돼야 한다.|
|효율성|모든 과정은 명백히 실행(검증) 가능한 것이어야 합니다.|
|입력|알고리즘은 0또는 그 이상의 입력들을 갖습니다. 즉 밖에서 들어오는 데이터가 없거나 1개 이상입니다.|
|출력|알고리즘은 하나나 그 이상의 출력들을 갖습니다. 즉 최소한 출력이 1개라도 있어야 합니다.|

<br>

알고리즘과 자료구조를 적용하지 않을 경우, 동일한 문제를 반복해서 해결해야 할 수 있으며 이는 자원의 낭비로 이어집니다.