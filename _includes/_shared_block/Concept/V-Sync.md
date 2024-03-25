# V-Sync
V-Sync(수직 동기화)는 그래픽 처리 과정에서 모니터의 새로 고침 빈도와 그래픽 카드가 출력하는 프레임 레이트를 동기화하는 기술입니다. 이는 화면 찢어짐 현상을 방지하기 위해 사용되며, 모니터가 한 번에 하나의 완전한 프레임을 표시하도록 보장합니다. Unity에서 V-Sync 설정은 `QualitySettings.vSyncCount`를 통해 관리됩니다.

## V-Sync의 동작 원리

- **화면 찢어짐 현상 방지**: V-Sync는 모니터가 새로 고침을 하는 동안에만 프레임을 전환하도록 함으로써 화면 찢어짐 현상을 방지합니다.
- **프레임 레이트 제한**: 모니터의 새로 고침 빈도에 따라 게임의 프레임 레이트를 제한합니다. 예를 들어, 60Hz 모니터에서는 게임이 초당 최대 60프레임으로 실행됩니다.

## Unity에서 V-Sync 설정하기

Unity의 `QualitySettings.vSyncCount` 속성을 통해 V-Sync를 설정할 수 있습니다.

- **`vSyncCount = 0`**: V-Sync 비활성화. `Application.targetFrameRate`를 사용하여 프레임 레이트를 수동으로 제한할 수 있습니다.
- **`vSyncCount = 1`**: V-Sync 활성화. 프레임 레이트가 모니터의 새로 고침 빈도(보통 60Hz)에 동기화됩니다.
- **`vSyncCount = 2`**: 모니터의 새로 고침 빈도의 절반으로 프레임 레이트를 제한합니다. 예를 들어, 60Hz에서는 30fps로 제한됩니다.

## V-Sync 활성화/비활성화 시 고려사항

- **성능 영향**: V-Sync 활성화는 프레임 레이트를 제한하므로 성능에 영향을 미칠 수 있습니다. 특히, 그래픽 카드가 모니터의 새로 고침 빈도보다 더 많은 프레임을 생성할 수 있는 경우에 해당합니다.
- **입력 지연**: V-Sync는 입력 지연을 약간 증가시킬 수 있으므로, 빠른 반응 속도가 중요한 게임에서는 비활성화를 고려할 수 있습니다.

## 결론

Unity에서 V-Sync 설정은 게임의 시각적 품질과 성능 사이의 균형을 맞추는 데 중요한 역할을 합니다. 화면 찢어짐 현상을 방지하고 더 안정적인 게임 플레이 경험을 제공하고자 한다면 V-Sync를 활성화하는 것이 좋습니다. 그러나 특정 상황에서는 성능 최적화를 위해 비활성화하는 것이 더 나을 수 있습니다.

### 참조

* [Unity Documentation, "Quality"](https://docs.unity3d.com/Manual/class-QualitySettings.html)
* [Unity Documentation, "QualitySetting.vSyncCount"](https://docs.unity3d.com/ScriptReference/QualitySettings-vSyncCount.html)
