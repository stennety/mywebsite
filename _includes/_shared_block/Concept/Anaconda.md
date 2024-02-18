Anaconda는 데이터 과학 및 기계 학습을 위한 오픈 소스 패키지 관리 및 배포 플랫폼입니다. Anaconda는 Python과 R을 포함한 다양한 프로그래밍 언어와 라이브러리를 사용하여 데이터 분석, 과학적 컴퓨팅, 기계 학습, 대규모 데이터 처리 등을 수행하는 데 사용됩니다.

Conda는 Anaconda의 패키지 관리자이며, Python 및 기타 패키지를 설치, 업데이트 및 관리하는 데 사용됩니다. **Conda를 사용하면 여러 환경을 격리하고 패키지 간의 의존성을 해결할 수 있습니다.** Anaconda Navigator를 이용하여 시각적인 사용자 인터페이스를 사용할 수 있습니다.

Anaconda Cloud는 Anaconda의 패키지 및 환경을 공유하고 배포하기 위한 온라인 플랫폼입니다. 사용자들은 자신의 패키지를 업로드하고 다른 사람의 패키지를 검색하여 사용할 수 있습니다.

* 환경 추가 및 삭제 예시

```shell
# 환경 리스트를 봅니다.
conda env list

# 환경 추가 및 삭제
conda env remove -n --name

# python 3.7 버전의 환경 추가
conda create -n "py3.7" python=3.7

# 환경 변경
conda activate --name
```

* Requirements 설치 예시

```shell
# 경로로 이동
cd ..path

# requirements 설치
# 
# --- reqyurenebts.txt ---
# regex==2017.4.5
# ------------------------
# 
pip install -r requirements.txt
```
