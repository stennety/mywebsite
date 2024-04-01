## Continum mechanics (연속체 역학)
연속체 역학에서의 핵심 개념은 물질을 연속적으로 분포된 매체로 보고, 이 매체 내에서 발생하는 변형률과 그에 응답하는 응력을 연구하는 것입니다. 이는 외부 힘에 의한 물질의 변위를 설명하며, 이 변위는 운동량과 에너지의 보존 법칙에 의해 정량적으로 표현됩니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/65883958-1921-4ef9-b660-ac0bbb50ddee)

왼쪽 그림은 3차원 공간에서의 한 점 $\mathbf{X}$의 변형률을 벡터 필드로 표현하고 있습니다. 이는 원점 $O$에서 시작하여 $x_1, x_2, x_3$축에 대응하는 좌표로 구성된 3차원 공간에서의 한 점 $\mathbf{X}$을 나타내고 있습니다. $\mathbf{X}$는 변형률 텐서 $\mathbf{K}_t$에 의해 시간 $t$에 따라 어떻게 변형되는지를 나타내며, $\dot{\mathbf{x}} = \mathbf{K}_t(\mathbf{X})$로 표현됩니다. 여기서 $\dot{\mathbf{x}}$는 점 $\mathbf{X}$의 시간에 따른 변화율, 즉 속도를 나타냅니다. $\mathbf{X}$의 위치는 벡터 $\mathbf{x}_i$와 기저 벡터 $\mathbf{e}_i$의 선형 조합으로 표현되며, 이것이 변형 전의 위치를 나타냅니다.

오른쪽 그림은 연속체의 일부분 $B$가 시간에 따라 어떻게 변형되는지를 나타내는 것으로, 변형률 텐서 $\mathbf{K}_t$에 의해 변형된 연속체 $B$의 모델링을 보여줍니다. 이 변형된 영역은 시간 $t$에 따라 연속체 내의 각 점이 어떻게 이동하는지를 나타내며, 왼쪽 그림의 점 $\mathbf{X}$가 시간에 따라 이동하여 변형된 연속체 내의 새로운 위치를 차지하게 됩니다.

### 전체 힘

전체 힘 $\mathbf{F}$은 표면력 $\mathbf{F}_c$와 체적력 $\mathbf{F}_B$의 합으로 나타낼 수 있습니다. 이를 수학적으로 표현하면 다음과 같습니다:

$$ \mathbf{F} = \mathbf{F}_c + \mathbf{F}_B $$

- $\mathbf{F}_c$는 표면에서 작용하는 힘으로, 표면적을 통한 응력 텐서 $\mathbf{T}$의 적분으로 나타낼 수 있습니다.
- $\mathbf{F}_B$는 체적력으로, 밀도 $\rho$와 체적력 벡터 $\mathbf{b}$의 곱을 체적 $V$에 대해 적분하여 얻습니다.



![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/5f868b9d-f32d-4cc5-b917-70c54ec1dd98)


### 참고
* [Wikipedia, "Continuum mechanics"](https://en.wikipedia.org/wiki/Continuum_mechanics#:~:text=A%20solid%20is%20a%20deformable%20body%20that%20possesses%20shear%20strength%2C%20sc.%20a%20solid%20can%20support%20shear%20forces%20%28forces%20parallel%20to,shear%20forces.) 
