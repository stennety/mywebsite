# 언리얼 엔진 캐릭터 클래스와 이동 시스템 개요

언리얼 엔진의 캐릭터 클래스는 다양한 플레이어 움직임을 구현하는 기본 구조를 제공합니다. 이 클래스는 걷기, 달리기, 점프, 비행, 수영 등을 포함하여 다양한 수직 지향적 플레이어 표현을 가능하게 합니다. 이를 위해 기본 네트워킹과 입력 모델, `CharacterMovementComponent`, `CapsuleComponent`, `SkeletalMeshComponent` 등을 포함한 풍부한 기능을 제공합니다.

## 캐릭터 이동의 핵심 컴포넌트

### CharacterMovementComponent
언리얼 엔진에서 캐릭터의 이동을 관리하는 핵심 컴포넌트입니다. 이 컴포넌트는 캐릭터의 다양한 이동 상태를 세밀하게 제어하며, 캐릭터가 자연스러운 움직임을 보일 수 있도록 합니다.

- 속도(velocity)와 가속도(acceleration) 제어를 통해 위치와 회전을 결정합니다.
- `AddForce()` 메서드로 힘을 추가해 가속도를 계산하고, 이동 모드(`MovementMode`)에 따라 상황에 맞는 처리를 수행합니다.

### SkeletalMeshComponent
스켈레탈 메쉬를 사용하여 골격을 기반으로 한 고급 애니메이션을 활성화합니다. 이 컴포넌트는 캐릭터와 직접적으로 연관된 주요 스켈레탈 메쉬로 작동합니다.

### CapsuleComponent
이동 충돌을 위해 사용되며, `CharacterMovementComponent`가 복잡한 기하학적 계산을 수행할 수 있도록 지원합니다. 이 컴포넌트는 수직 방향으로 배치된 캡슐 형태로 캐릭터의 충돌을 처리합니다.

## 이동 시스템의 특징과 처리

- **RootMotion:** 애니메이션의 루트 본을 기준으로 캐릭터의 위치를 제어합니다. 이는 보다 정교한 애니메이션 기반의 움직임을 가능하게 합니다.
- **AI Controller:** 캐릭터의 회전 처리에 AI 컨트롤러와 같은 외부 요소가 영향을 줄 수 있습니다. 특히, `FocalPoint`나 `FocusActor`를 기준으로 회전을 결정하는 등, 캐릭터 이동의 다양한 상호작용을 이해하는 것이 중요합니다.

## 결론
언리얼 엔진의 캐릭터 클래스와 이동 시스템은 게임 내에서 다양한 플레이어 행동과 움직임을 구현할 수 있는 강력한 도구를 제공합니다. 특히, `CharacterMovementComponent`는 이동과 관련된 핵심적인 기능을 담당하며, 캐릭터의 자연스러운 움직임을 위한 세밀한 제어를 가능하게 합니다.

### 참고 문헌
- [Unreal Engine Documentation, "Characters"](https://dev.epicgames.com/documentation/en-us/unreal-engine/characters-in-unreal-engine?application_version=5.3)
- [그냥 그런 블로그, "5.4. 이동 모드와 속성들"](https://lifeisforu.tistory.com/332)
- [그냥 그런 블로그, "UE4 캐릭터 이동 시스템 가이드"](https://lifeisforu.tistory.com/304)
