# Learn OpenManus
A site to share how to learn from OpenManus( https://github.com/mannaandpoem/OpenManus)

## week 1

python预备知识 （Relevant Python knowlege to know for a former C/C++, Java Engineer... ）

-  异步编程/Asynchronous Programming: 
  
*Essential Things to Know*
最大程度的利用单线程来实现IO bound的多任务
All Async call will run in one single thread by default (until you specific them to as in multi ones)
事件循环 Event Loop: This is the heart of asyncio. It’s like a manager that runs all your async tasks.

Async Functions:  定义的函数可以在需要时暂停，让event loop把处理器让给其他的任务 通过 async def 定义。 why： openmanus需要处理IO bound的任务，因此用async来提高单线程的多任务能力。 

Await: 通知event loop, “Pause here, go do something else, and come back when this is ready.” You use it with async functions or other “awaitable” things (like coroutines or tasks).

- Type Annotations: Heavy use of Python's type hinting system (typing module) for better code clarity and static analysis.
类型注解在 Python 中用于提高代码的可读性和可维护性，明确指定变量和函数的预期类型。
它为静态类型检查工具提供了支持，可以在开发阶段捕获潜在的类型错误。
why： 增强动态语言的可读性  

- Pydantic: Used extensively for data validation and settings management through BaseModel and Field classes.

Python库，用于数据验证和序列化，通过利用 Python 的类型注解来定义数据模型并自动验证输入数据是否符合预期，已经系列化。
why: 通过类型注解实现声明式数据验证和序列化。

- OOP： 应用ABC+pydantic， OOP Abstract类/继承/多态

- Web Scraping & Search: Utilizes libraries like BeautifulSoup, requests, and search engine specific packages (baidusearch, duckduckgo_search, googlesearch).
  处理web文件下载解析

- LLM Integration: Uses openai and tiktoken for language model interactions and token counting.

- Browser-use： 用browser-use开源 agent来处理浏览器的自动化交互
why： 利用开源Agent简化开发

