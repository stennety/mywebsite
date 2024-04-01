C#에서의 `Attribute`와 `Reflection`은 코드 메타데이터를 정의하고, 이를 실행 시간(runtime)에 검사할 수 있는 강력한 방법을 제공합니다. 이러한 기능을 사용하여 프로그램의 동작을 동적으로 변경하거나, 프로그램 정보를 검사하는 등 다양한 고급 기능을 구현할 수 있습니다.

### Attribute (속성)

- **정의**: `Attribute`는 클래스, 메서드, 변수 등의 선언 시에 추가할 수 있는 메타데이터입니다. 이 메타데이터는 실행 시간에 반영성을 사용하여 접근하고 검사할 수 있습니다. 예를 들어, 메서드가 특정 조건에서만 실행되도록 하거나, 클래스의 목적을 설명하는 데 사용될 수 있습니다.
- **사용 방법**: `Attribute`는 대괄호(`[]`)를 사용하여 선언 대상 앞에 추가합니다. C#에는 여러 내장 속성이 있으며, 사용자가 직접 정의할 수도 있습니다.
- **예시**: `[Serializable]`은 클래스가 직렬화될 수 있음을 나타내는 내장 속성입니다. 사용자 정의 속성도 생성할 수 있으며, 이 경우 `Attribute` 클래스를 상속받아 구현합니다.

### Reflection (반영성)

- **정의**: `Reflection`은 실행 중인 프로그램 내의 타입(type)에 대한 정보를 검사하고, 이 타입의 인스턴스를 생성하거나, 타입에 정의된 메서드를 호출하거나, 필드에 접근하는 등의 동작을 할 수 있게 해주는 프로세스입니다.
- **기능**: `Reflection`을 사용하면 프로그램이 자신의 구조를 검사하고 수정할 수 있습니다. 이를 통해 매우 동적인 프로그래밍이 가능해집니다. 예를 들어, 플러그인 시스템이나 테스트 프레임워크 등에서 널리 사용됩니다.
- **사용 예**: `Type` 클래스를 사용하여 클래스의 정보를 얻거나, `MethodInfo`, `FieldInfo`, `PropertyInfo` 등을 사용하여 메서드, 필드, 프로퍼티 정보를 얻을 수 있습니다.

### Type에 대한 Reflection 사용 예

```csharp
using System;
using System.Reflection;

class Program
{
    static void Main(string[] args)
    {
        // 'Type' 정보 얻기
        Type typeInfo = typeof(MyClass);

        // 클래스 이름 출력
        Console.WriteLine("Class Name: " + typeInfo.Name);

        // 메서드 정보 얻기
        MethodInfo[] methods = typeInfo.GetMethods();
        foreach (var method in methods)
        {
            Console.WriteLine("Method Name: " + method.Name);
        }
    }
}

public class MyClass
{
    public void Method1() { }
    public void Method2() { }
}
```

위 예제에서는 `Reflection`을 사용하여 `MyClass` 타입의 메서드 이름을 검사하고 출력합니다. 이와 같은 방법으로 실행 시간에 타입의 구조를 동적으로 검사하고, 이를 활용할 수 있습니다.

`Attribute`와 `Reflection`은 C# 프로그래밍에서 매우 강력한 기능을 제공합니다. 이를 통해 개발자는 더 유연하고, 동적인 코드를 작성할 수 있게 됩니다.
