## Assembly
C#에서의 `Assembly`는 .NET 애플리케이션을 구성하는 기본 빌딩 블록입니다. 이는 실행 가능한 코드와 해당 코드가 사용하는 리소스를 포함하는 하나의 컴파일된 단위입니다. `Assembly`는 일반적으로 DLL(Dynamic Link Library) 파일이나 EXE(Executable) 파일 형태로 존재합니다.

### Assembly의 주요 특징:

- **자체 기술적(Self-Describing)**: 각 `Assembly`는 메타데이터를 포함하고 있으며, 이 메타데이터는 `Assembly`에 포함된 타입, 타입 멤버, `Assembly` 자체에 대한 참조 등의 정보를 포함합니다. 이러한 메타데이터는 `Reflection`을 통해 실행 시간에 검사할 수 있습니다.
- **버전 관리**: .NET `Assembly`는 강력한 버전 관리를 지원합니다. 각 `Assembly`는 버전 번호를 가지며, 이를 통해 동일한 `Assembly`의 다양한 버전을 구분하고, 특정 버전에 대한 의존성을 명확하게 할 수 있습니다.
- **보안**: `Assembly`는 코드 액세스 보안(Code Access Security, CAS)을 사용하여 특정 권한을 요구하거나 부여할 수 있습니다. 이는 `Assembly`가 실행되는 환경에 따라 다른 보안 정책을 적용할 수 있게 해줍니다.
- **포함된 리소스**: `Assembly`는 이미지, 문자열 등의 정적 리소스를 포함할 수 있습니다. 이러한 리소스는 애플리케이션에서 직접 사용할 수 있습니다.

### Assembly의 주요 구성 요소:

1. **매니페스트(Manifest)**: `Assembly`의 메타데이터를 포함합니다. 이는 `Assembly`의 이름, 버전, 문화권 정보(언어 및 지역 설정), `Assembly`에 포함된 파일, 기타 `Assembly`에 대한 참조 등을 포함합니다.
2. **타입(Type)과 리소스**: 사용자가 정의한 클래스, 인터페이스, 열거형, 구조체 등의 타입과, 이미지, 파일, 문자열 등의 리소스가 이에 속합니다.
3. **MSIL(Microsoft Intermediate Language) 코드**: `Assembly`에 포함된 모든 메서드와 속성의 실행 코드는 MSIL(또는 단순히 IL) 형태로 저장됩니다. 이 코드는 실행 시 JIT(Just-In-Time) 컴파일러에 의해 기계어로 변환됩니다.

### Assembly 작업 예:

.NET `Assembly`는 `Reflection`을 사용하여 프로그램 내에서 또는 프로그램 외부에서 분석하고 조작할 수 있습니다. 예를 들어, 특정 `Assembly`에서 모든 타입을 로드하고, 각 타입에 대해 정보를 얻거나, 특정 메서드를 동적으로 호출하는 것이 가능합니다.

`Assembly`를 사용하여 프로그램의 모듈화와 재사용성을 높일 수 있으며, 동적으로 코드를 로드하고 실행하는 등 다양한 고급 기능을 구현할 수 있습니다.

## Attribute And Reflection

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

## Type
C#과 .NET 프레임워크에서 `Type` 클래스는 모든 타입에 대한 메타데이터를 캡슐화합니다. 이 클래스는 `System` 네임스페이스 안에 있으며, 클래스, 인터페이스, 배열, 값 타입, 열거형 등 모든 데이터 타입에 대한 정보를 포함하고 접근할 수 있는 방법을 제공합니다. `Type` 클래스를 사용하면 실행 시간에 타입 정보를 조회하고, 해당 타입의 인스턴스를 동적으로 생성하거나, 타입의 멤버(메서드, 속성, 필드, 이벤트 등)에 접근하는 것이 가능합니다. 이는 C#의 반영성(Reflection) 기능의 핵심 부분입니다.

### Type 클래스의 주요 사용 사례와 기능

- **타입 정보 조회**: `Type` 객체를 사용하여 타입의 이름, 네임스페이스, 어셈블리, 부모 클래스, 구현된 인터페이스, 접근 가능한 메서드와 속성 등의 정보를 조회할 수 있습니다.
- **동적 인스턴스 생성**: `Activator.CreateInstance` 메서드와 같은 반영성 기능을 사용하여 `Type` 정보를 기반으로 객체의 인스턴스를 동적으로 생성할 수 있습니다.
- **멤버 접근**: `Type` 객체를 통해 특정 타입의 모든 메서드, 속성, 필드, 이벤트 등을 조회하고, 이들 멤버에 동적으로 접근하거나 이를 조작할 수 있습니다.

### Type 클래스의 예제

아래의 예제 코드는 `Type` 클래스의 사용 방법을 보여줍니다:

```csharp
using System;

class Program
{
    static void Main()
    {
        // Type 객체 얻기
        Type typeInfo = typeof(string);

        // 타입 정보 출력
        Console.WriteLine("Type Name: " + typeInfo.Name);
        Console.WriteLine("Full Name: " + typeInfo.FullName);
        Console.WriteLine("Namespace: " + typeInfo.Namespace);
        Console.WriteLine("Is Class: " + typeInfo.IsClass);

        // 메서드 정보 출력
        Console.WriteLine("\nMethods:");
        foreach (var method in typeInfo.GetMethods())
        {
            Console.WriteLine(method.Name);
        }
    }
}
```

이 코드는 `string` 타입에 대한 정보를 조회하고, 해당 타입의 이름, 전체 이름, 네임스페이스, 클래스 여부를 출력합니다. 또한, `string` 타입이 가진 모든 메서드의 이름을 출력합니다.

### Type 클래스와 Reflection

`Type` 클래스는 C#의 반영성 기능에서 중심적인 역할을 합니다. 반영성을 사용하면 실행 시간에 프로그램의 메타데이터를 조회하고, 타입의 인스턴스를 생성하며, 멤버를 호출하는 등의 동적인 작업을 수행할 수 있습니다. 이를 통해 높은 수준의 유연성과 동적인 프로그래밍이 가능해집니다. 예를 들어, 플러그인 시스템, 객체 관계 매핑(ORM) 라이브러리, 직렬화 도구 등 다양한 고급 기능과 라이브러리에서 `Type` 클래스와 반영성이 널리 사용됩니다.

## Activator
`Activator` 클래스는 .NET에서 객체의 인스턴스를 생성하거나, 원격 객체를 연결하는 등의 작업을 돕는 정적 메서드를 제공하는 클래스입니다. 이 클래스는 `System` 네임스페이스에 속해 있으며, 주로 `Type` 객체를 이용해 해당 타입의 인스턴스를 실행 시간에 동적으로 생성할 때 사용됩니다. `Activator.CreateInstance` 메서드는 `Activator` 클래스에서 가장 자주 사용되는 메서드 중 하나로, 특정 타입의 새 인스턴스를 생성합니다.

### Activator.CreateInstance
`Activator.CreateInstance`메서드는 지정된 유형의 인스턴스를 만드는 .NET Framework의 메서드 중 하나입니다. 이 메서드는 지정된 유형의 인스턴스를 만들고, 반환 타입으로 다시 캐스팅할 수 있습니다.

`Activator.CreateInstance`메서드는 파라미터로 생성할 인스턴스의 Type을 받으며, 이 인스턴스를 만들어 반환합니다. 이 메서드는 클래스의 인스턴스를 만드는 데 자주 사용됩니다. 만약 지정된 클래스가 매개 변수 없는 생성자를 갖고 있지 않으면 MissingMethodException 예외가 발생합니다.

예를 들어, `Activator.CreateInstance(typeof(string))`은 String 클래스의 인스턴스를 생성합니다. `Activator.CreateInstance(typeof(MyClass))`는 MyClass 클래스의 인스턴스를 생성합니다. 생성자의 매개 변수를 전달해야 하는 경우, 해당 생성자에 매개 변수를 전달하여 인스턴스를 만들 수 있습니다.

## 결론
### 참조
* [MSDN, ".NET Assembly"](https://learn.microsoft.com/ko-kr/dotnet/standard/assembly/)
* [MSDN, "Attribute"](https://learn.microsoft.com/ko-kr/dotnet/csharp/advanced-topics/reflection-and-attributes/)
* [MSDN, "Type 클래스"](https://learn.microsoft.com/ko-kr/dotnet/api/system.type?view=net-8.0)
* [MSDN, "Activator 클래스"](https://learn.microsoft.com/ko-kr/dotnet/api/system.activator.createinstance?redirectedfrom=MSDN&view=net-7.0#overloads)
