# Character

언리얼 엔진의 캐릭터 클래스(Character class)는 Pawn 클래스를 확장하여, 걷기, 달리기, 점프, 비행, 수영 등의 다양한 수직 지향적 플레이어 표현을 가능하게 합니다. 이 클래스는 기본 네트워킹과 입력 모델의 구현뿐만 아니라, CharacterMovementComponent, CapsuleComponent, SkeletalMeshComponent를 포함하여 더욱 풍부한 기능을 제공합니다.

언리얼 엔진의 CharacterMovementComponent를 통해 개발자는 캐릭터의 다양한 이동 상태를 세밀하게 제어할 수 있으며, 캐릭터가 게임 환경 내에서 자연스럽게 움직이도록 할 수 있습니다. 이를 통해, 보다 몰입감 있는 게임 플레이 경험을 제공하는 것이 가능해집니다.

## SkeletalMeshComponent
캐릭터는 Pawn과 달리 스켈레탈 메쉬(SkeletalMeshComponent)를 사용하여 골격을 사용하는 고급 애니메이션을 활성화합니다. 다른 스켈레탈 메쉬를 캐릭터 파생 클래스에 추가할 수 있지만, 이는 캐릭터와 연관된 주요 스켈레탈 메쉬입니다. 스켈레탈 메쉬와 스켈레탈 메쉬 애니메이션 시스템에 대한 자세한 내용은 관련 문서를 참조하십시오.

## CapsuleComponent
CapsuleComponent는 이동 충돌을 위해 사용됩니다. CharacterMovementComponent가 복잡한 기하학을 계산할 수 있도록, 캐릭터 클래스의 충돌 컴포넌트는 수직 방향으로 배치된 캡슐이라고 가정합니다. 캡슐과 정적 메쉬와의 충돌 설정에 대한 자세한 내용은 관련 문서를 참조하십시오.

## CharacterMovementComponent
CharacterMovementComponent는 강체 물리학을 사용하지 않는 아바타가 걷기, 달리기, 점프, 비행, 낙하, 수영을 통해 이동할 수 있도록 합니다. 이 컴포넌트는 캐릭터에 특화되어 있으며, 다른 클래스에서는 구현할 수 없습니다. CharacterMovementComponent에서 설정할 수 있는 속성에는 낙하 및 걷기 마찰력, 공기와 물을 통한 이동 속도, 육지 이동 속도, 부력, 중력 스케일, 캐릭터가 물리 객체에 가할 수 있는 물리적 힘의 값이 포함됩니다. 또한, CharacterMovementComponent는 애니메이션에서 오는 루트 모션 매개변수를 포함하며, 이는 이미 물리학에 의해 월드 공간에서 변환된 준비가 완료된 상태입니다.

# Reference
* [Unreal Engine Documentation, "Characters"](https://dev.epicgames.com/documentation/en-us/unreal-engine/characters-in-unreal-engine?application_version=5.3)
* [그냥 그런 블로그, "5.4. 이동 모드와 속성들"](https://lifeisforu.tistory.com/332)
