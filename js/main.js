/** Вопросы и ответы: id, question, answer. id — строго по порядку 1, 2, 3, … N; при добавлении/удалении пересчитывать и обновлять questionIds в BLOCKS. */
const QUESTIONS = [
  { id: 1, question: 'Что такое Python?', answer: '**Python** — высокоуровневый **интерпретируемый** язык с **динамической** и **строгой типизацией**.\n\n**Интерпретируемый:** код не компилируется в машинный язык заранее; в CPython он превращается в байт-код и выполняется виртуальной машиной «на лету», без отдельного шага сборки в исполняемый файл.\n\n**Типизация:** динамическая — тип переменной определяется в runtime (одна и та же переменная может ссылаться на объекты разных типов); строгая — неявных приведений типов почти нет (например, нельзя сложить строку и число без явного преобразования).\n\n**Под капотом (CPython), по шагам:**\n1. Исходный код (.py) парсится в AST (Абстрактное синтаксическое дерево).\n2. AST компилируется в байт-код (.pyc).\n3. Байт-код выполняется виртуальной машиной (PVM).\n4. Результат — переносимость между платформами без перекомпиляции.\n\n**Сборщик мусора:** основной механизм — **подсчёт ссылок (reference counting):** у каждого объекта хранится счётчик — сколько ссылок на него указывает; при создании ссылки счётчик увеличивается, при удалении ссылки — уменьшается; когда счётчик становится 0, объект сразу освобождается. Дополнительно модуль **gc** находит циклы ссылок (A → B → C → A), где счётчики не обнуляются, и помечает такие объекты для удаления.' },
  { id: 2, question: 'Какие типы данных есть в Python?', answer: 'Типы делятся на **изменяемые** и **неизменяемые**.\n\n**Изменяемые:** list, dict, set — могут изменяться после создания.\n\n**Неизменяемые:** int, float, complex, bool, str, tuple, frozenset — при изменении создаётся новый объект.' },
  { id: 3, question: 'Какие структуры данных есть в Python?', answer: '**Встроенные:** список (динамический массив), кортеж (неизменяемая последовательность), словарь (хэш-таблица), множество, строка, range.\n\n**Через библиотеки или свои реализации:** стек, очередь, деревья и графы.' },
  { id: 4, question: 'Что такое lambda-функция?', answer: '**Lambda** — анонимная функция, ограниченная одним выражением.\n\nЧаще всего используется как аргумент **функций высшего порядка** (map, filter, sorted) или там, где полноценное def избыточно.\n\nПример:\n  square = lambda x: x ** 2\n  evens = filter(lambda x: x % 2 == 0, [1, 2, 3, 4])\n  sorted(users, key=lambda u: u[\'name\'])' },
  { id: 5, question: 'Что такое генератор?', answer: '**Генератор** — объект, возвращающий значения по одному по запросу (**ленивые вычисления**). Реализует протокол итератора (__iter__, __next__), при исчерпании выбрасывает **StopIteration**.\n\n**Создание:** функция с **yield** или **generator comprehension** (x for x in ...). Экономят память — не хранят всю последовательность сразу.\n\n**Методы:**\n**next(g)** / **g.__next__()** — следующее значение.\n**g.send(value)** — отправить значение в генератор (оно подставляется в выражение yield). Перед первым **send(value)** нужно «прогнать» генератор до первого yield — вызвать **send(None)** или **next(g)**; иначе некуда подставлять value.\n**g.throw(exc)** — выбросить исключение внутри генератора.\n**g.close()** — завершить генератор.\n\n**return** в теле генератора: завершает генератор; в Python 3.3+ значение после return попадает в атрибут **StopIteration.value** (при переборе через for не видно, только при ручном next).\n\nПример с yield:\n  def count_to(n):\n    for i in range(n):\n      yield i\n  g = count_to(3)\n  next(g)  # 0\n  next(g)  # 1\n\nПример generator comprehension:\n  squares = (x ** 2 for x in range(5))\n  list(squares)  # [0, 1, 4, 9, 16]' },
  { id: 6, question: 'Что такое итератор?', answer: '**Итератор** — объект, поддерживающий **протокол итерации** (__iter__, __next__).\n\nХранит текущее состояние перебора и выбрасывает **StopIteration**, когда элементы заканчиваются.\n\nПример итератора на уровне класса:\n  class CountDown:\n    def __init__(self, start):\n      self.current = start\n    def __iter__(self):\n      return self\n    def __next__(self):\n      if self.current <= 0:\n        raise StopIteration\n      value = self.current\n      self.current -= 1\n      return value\n  for x in CountDown(3):\n    print(x)  # 3, 2, 1' },
  { id: 7, question: 'Что такое list/dict comprehension?', answer: '**Comprehension** — синтаксический сахар для компактного создания коллекций (list, dict, set). Повышает читаемость и часто быстрее эквивалентных циклов for.\n\n**List comprehension:**\n  [x ** 2 for x in range(5)]           # [0, 1, 4, 9, 16]\n  [x for x in nums if x % 2 == 0]     # только чётные\n  [x if x > 0 else 0 for x in nums]  # тернарный (else обязателен)\n\n**С несколькими for и if:**\n  [(i, j) for i in range(2) for j in range(2) if i != j]  # [(0,1), (1,0)]\n  [x for row in matrix for x in row]  # «развернуть» матрицу в список\n\n**Dict comprehension:**\n  {k: v * 2 for k, v in d.items()}\n  {x: x ** 2 for x in range(5) if x % 2 == 0}  # {0: 0, 2: 4, 4: 16}\n\n**Set comprehension:**\n  {abs(x) for x in [-1, 1, -2, 2]}  # {1, 2}' },
  { id: 8, question: 'Что такое *args и **kwargs?', answer: 'Используются для передачи **переменного количества аргументов**.\n\n***args** — собирает позиционные аргументы в **кортеж**.\n\n****kwargs** — именованные аргументы в **словарь**. Часто применяются в декораторах и обёртках.\n\nПримеры в функции:\n  def f(*args):\n    print(args)  # кортеж\n  f(1, 2, 3)   # (1, 2, 3)\n\n  def g(**kwargs):\n    print(kwargs)  # словарь\n  g(a=1, b=2)     # {\'a\': 1, \'b\': 2}\n\n  def h(*args, **kwargs):\n    print(args, kwargs)\n  h(1, 2, x=3)   # (1, 2) {\'x\': 3}' },
  { id: 9, question: 'Основные принципы ООП?', answer: '**Абстракция** — выделение ключевых характеристик объекта. **Инкапсуляция** — скрытие реализации и контроль доступа. **Наследование** — повторное использование логики. **Полиморфизм** — единый интерфейс для разных реализаций.' },
  { id: 10, question: 'Разница между __new__(), __init__(), __call__()?', answer: '**__new__** — создаёт объект в памяти (возвращает экземпляр).\n\n**__init__** — инициализирует уже созданный объект (self уже есть).\n\n**__call__** — позволяет вызывать экземпляр класса как функцию.\n\nПример (import не нужен — всё встроено):\n  class A:\n    def __new__(cls, x):\n      obj = super().__new__(cls)\n      return obj\n    def __init__(self, x):\n      self.x = x\n    def __call__(self, y):\n      return self.x + y\n  a = A(10)   # 1) __new__(A, 10) создаёт объект, 2) __init__(a, 10) задаёт a.x = 10\n  a(5)       # 15 — вызывается __call__(a, 5), возвращает a.x + 5' },
  { id: 11, question: 'Что такое декоратор?', answer: '**Декоратор** — функция, которая принимает другую функцию и возвращает новую, расширяя или изменяя её поведение.\n\nЧасто используется для **логирования**, **авторизации**, **кэширования**.' },
  { id: 12, question: 'Что такое дескрипторы?', answer: '**Дескрипторы** — классы, управляющие доступом к атрибутам других классов. Реализуют **__get__**, **__set__** (опционально), **__delete__** (опционально). Используются в **property**, ORM и системах валидации.\n\nПример:\n  class NonNegative:\n    def __init__(self, name):\n      self.name = name\n    def __get__(self, obj, type=None):\n      return obj.__dict__.get(self.name, 0)\n    def __set__(self, obj, value):\n      if value < 0:\n        raise ValueError(\'must be >= 0\')\n      obj.__dict__[self.name] = value\n  class Product:\n    price = NonNegative(\'price\')\n  p = Product()\n  p.price = 10   # ok\n  p.price = -1   # ValueError' },
  { id: 13, question: '@staticmethod / @classmethod / @property?', answer: '**@staticmethod** — логически связан с классом, не использует self или cls.\n\n**@classmethod** — работает с классом и его состоянием (получает cls).\n\n**@property** — обращение к методу как к атрибуту.' },
  { id: 14, question: 'Что такое __slots__?', answer: '**__slots__** ограничивает динамическое создание атрибутов и снижает потребление памяти.\n\nВажно при большом количестве объектов.' },
  { id: 15, question: 'Что такое MRO?', answer: '**MRO** (Method Resolution Order) — порядок поиска методов при **множественном наследовании**.\n\nВ Python используется алгоритм **C3** для предотвращения конфликтов.' },
  { id: 16, question: 'Что такое метаклассы?', answer: '**Метаклассы** управляют созданием классов (класс — экземпляр метакласса).\n\nИспользуются для **валидации**, **регистрации** классов и построения фреймворков.' },
  { id: 17, question: 'Что такое GIL?', answer: '**GIL** (Global Interpreter Lock) — блокировка, ограничивающая одновременное выполнение байт-кода **одним потоком** в CPython.\n\n**Для чего:** избежание **race conditions** (гонок). Race condition — когда два потока одновременно читают или меняют одни и те же данные и результат зависит от порядка выполнения (данные могут испортиться). В CPython используется **подсчёт ссылок** — без GIL два потока могли бы менять счётчик одного объекта одновременно. GIL гарантирует, что байт-код выполняется только одним потоком в момент времени, защищая внутренние структуры и C-расширения.\n\nМинус: снижает эффективность **CPU-bound** задач в потоках; для параллелизма по CPU — процессы (multiprocessing) или альтернативы (PyPy, Jython).' },
  { id: 18, question: 'Поверхностная и глубокая копия?', answer: '**Shallow copy** — копирует только верхний уровень (вложенные объекты — по ссылке). **Deep copy** — рекурсивно копирует все вложенные объекты.\n\nПримеры:\n  import copy\n  a = [1, [2, 3]]\n  s = copy.copy(a)      # или a.copy(), a[:]\n  d = copy.deepcopy(a)\n  s[1][0] = 99\n  print(a[1][0])       # 99 — вложенный список общий у a и s\n  d[1][0] = 100\n  print(a[1][0])       # 99 — у d свой вложенный список' },
  { id: 19, question: 'O-нотация и сложность операций (list, dict, set)?', answer: '**O-нотация** описывает **асимптотическую сложность** алгоритма по времени или памяти при росте n (размера данных). Позволяет сравнивать решения независимо от железа.\n\n**list:**\nдоступ по индексу — O(1); добавление в конец append — O(1); вставка/удаление по индексу — O(n); поиск in / index (при указании значения) — O(n); сортировка — O(n log n); срез [i:j] — O(j−i).\n\n**tuple / str:**\nдоступ по индексу — O(1); поиск in — O(n); неизменяемы (создание копии при «изменении» — O(n)).\n\n**dict:**\nвставка, доступ по ключу, удаление — в среднем O(1); в худшем (плохой хэш, коллизии) — O(n); итерация — O(n).\n\n**set:**\nadd, in, remove — в среднем O(1); в худшем O(n); операции над множествами (объединение, пересечение) — до O(n+m).\n\n**deque** (collections):\nappend/popleft с обоих концов — O(1); доступ по индексу в середине — O(n).' },
  { id: 20, question: 'Что такое рекурсия?', answer: '**Рекурсия** — подход, при котором функция вызывает саму себя для решения подзадачи того же типа.\n\n**Базовый случай** — условие, при котором функция возвращает результат без вызова себя (останавливает цепочку). Без него — бесконечные вызовы и **RecursionError** (в Python лимит стека вызовов).\n\n**Рекурсивный случай** — вызов себя с упрощёнными аргументами (шаг к базовому случаю).\n\nКаждый вызов кладётся в **стек вызовов**; при большой глубине возможен переполнение стека. В Python **хвостовая рекурсия** не оптимизируется (в отличие от некоторых языков), поэтому при очень большой глубине часто используют цикл или явный стек.\n\nУдобна для обхода деревьев/графов, разбиения задачи (divide and conquer), рекурсивных структур данных.\n\nПример (факториал):\n  def fact(n):\n    if n <= 1:\n      return 1\n    return n * fact(n - 1)\n  fact(4)   # 24' },
  { id: 21, question: 'Что такое ORM?', answer: '**ORM** (Object Relational Mapping) связывает **объектную модель** приложения с **реляционной моделью** БД.\n\nСкрывает SQL-логику за Python-объектами.' },
  { id: 22, question: 'Что такое миграции?', answer: '**Миграции** — механизм **версионирования схемы БД**, позволяющий безопасно изменять структуру таблиц (создание, изменение, удаление).' },
  { id: 23, question: 'Что такое транзакция?', answer: '**Транзакция** — последовательность операций с БД, выполняемая как **единое целое** (всё выполняется или всё откатывается).' },
  { id: 24, question: 'Что такое ACID?', answer: 'Набор гарантий корректности транзакций: **атомарность**, **согласованность**, **изолированность**, **надёжность**.' },
  { id: 25, question: 'Что такое индексирование БД?', answer: '**Индексирование** — создание дополнительных структур данных (**индексов**) для ускорения **поиска** и **фильтрации** по столбцам.' },
  { id: 26, question: 'Что такое REST?', answer: '**REST** — архитектурный стиль построения API поверх **HTTP**.\n\nПринципы: **отсутствие состояния** (stateless), **единообразный интерфейс**, ресурсы по URI.' },
  { id: 27, question: 'Этапы работы HTTP?', answer: '**Этапы:** DNS → IP → **HTTP-запрос** → **HTTP-ответ** → обработка результата.' },
  { id: 28, question: 'Что такое сериализация и десериализация?', answer: '**Сериализация** — преобразование объектов в формат для передачи (JSON, pickle, XML и т.д.).\n\n**Десериализация** — восстановление объектов из этого формата.' },
  { id: 29, question: 'TCP и UDP?', answer: '**TCP** — надёжный, гарантирует доставку и порядок пакетов (установка соединения).\n\n**UDP** — быстрый, без гарантий доставки; используется для стриминга и игр.' },
  { id: 30, question: 'Чем библиотека отличается от фреймворка?', answer: '**Библиотека** — вызывается из пользовательского кода (вы управляете потоком).\n\n**Фреймворк** — управляет потоком выполнения и **вызывает** ваш код (инверсия управления).' },
  { id: 31, question: 'Что такое SOLID?', answer: 'Набор принципов проектирования: **S**ingle responsibility, **O**pen/Closed, **L**iskov substitution, **I**nterface segregation, **D**ependency inversion — повышают гибкость и поддерживаемость кода.' },
  { id: 32, question: 'GOF23: Порождающие паттерны (Creational)', answer: '**Порождающие паттерны** отвечают за создание объектов и снижают зависимость кода от конкретных классов.\n\n**Singleton** — единственный экземпляр:\n  class Singleton:\n    _instance = None\n    def __new__(cls):\n      if cls._instance is None:\n        cls._instance = super().__new__(cls)\n      return cls._instance\n\n**Factory Method** — создание в подклассах:\n  class Creator:\n    def factory_method(self): raise NotImplementedError\n    def use(self): return self.factory_method().do()\n  class ConcreteCreator(Creator):\n    def factory_method(self): return ConcreteProduct()\n\n**Abstract Factory** — семейство продуктов:\n  class GUIFactory:\n    def create_button(self): raise NotImplementedError\n    def create_checkbox(self): raise NotImplementedError\n  class WinFactory(GUIFactory): ...  # WinButton, WinCheckbox\n\n**Builder** — пошаговая сборка:\n  class Builder:\n    def set_a(self, x): self.a = x; return self\n    def set_b(self, x): self.b = x; return self\n    def build(self): return Product(self.a, self.b)\n  p = Builder().set_a(1).set_b(2).build()\n\n**Prototype** — клонирование:\n  import copy\n  class Prototype:\n    def clone(self): return copy.deepcopy(self)' },
  { id: 33, question: 'GOF23: Структурные паттерны (Structural)', answer: '**Структурные паттерны** показывают, как собирать объекты и классы в более крупные структуры.\n\n**Adapter** — подгонка интерфейса:\n  class OldAPI: def specific_request(self): return "data"\n  class Adapter:\n    def __init__(self): self.old = OldAPI()\n    def request(self): return self.old.specific_request()\n\n**Decorator** — обёртка с новой логикой:\n  def decorator(func):\n    def wrap(*a, **k): print("before"); r = func(*a,**k); print("after"); return r\n    return wrap\n  @decorator\ndef foo(): pass\n\n**Facade** — один простой вход:\n  class SubsystemA: def run(self): ...\n  class Facade:\n    def __init__(self): self.a, self.b = SubsystemA(), SubsystemB()\n    def do_all(self): self.a.run(); self.b.run()\n\n**Proxy** — заместитель с контролем доступа:\n  class Proxy:\n    def __init__(self): self._real = None\n    def request(self):\n      if self._real is None: self._real = RealSubject()\n      return self._real.request()\n\n**Composite** — дерево с единым интерфейсом:\n  class Component: def operation(self): raise NotImplementedError\n  class Leaf(Component): def operation(self): return "Leaf"\n  class Composite(Component):\n    def __init__(self): self.children = []\n    def add(self, c): self.children.append(c)\n    def operation(self): return [c.operation() for c in self.children]\n\n**Bridge** — абстракция + реализация:\n  class Implementor: def op(self): raise NotImplementedError\n  class Abstraction: def __init__(self, impl): self.impl = impl\n  def run(self): return self.impl.op()\n\n**Flyweight** — общее состояние:\n  class Flyweight:\n    _pool = {}\n    def __new__(cls, key): return cls._pool.setdefault(key, super().__new__(cls))' },
  { id: 34, question: 'GOF23: Поведенческие паттерны (Behavioral)', answer: '**Поведенческие паттерны** решают задачи взаимодействия объектов и распределения ответственности.\n\n**Command** — запрос как объект:\n  class Command:\n    def __init__(self, receiver): self.receiver = receiver\n    def execute(self): self.receiver.action()\n  class Invoker: def set_command(self, c): self.cmd = c\n  def run(self): self.cmd.execute()\n\n**Chain of Responsibility** — цепочка обработчиков:\n  class Handler:\n    def __init__(self): self.next = None\n    def handle(self, req):\n      if self.can_handle(req): return self.process(req)\n      return self.next.handle(req) if self.next else None\n\n**Observer** — подписчики уведомляются:\n  class Subject:\n    def __init__(self): self._observers = []\n    def attach(self, o): self._observers.append(o)\n    def notify(self): [o.update(self) for o in self._observers]\n  class Observer: def update(self, subj): print("notified")\n\n**Strategy** — взаимозаменяемый алгоритм:\n  class Strategy: def algo(self, data): raise NotImplementedError\n  class Context:\n    def __init__(self, strategy): self.strategy = strategy\n    def do(self, data): return self.strategy.algo(data)\n  ctx = Context(ConcreteStrategyA()); ctx.do(data)\n\n**Unit of Work** — накопление и коммит:\n  class UnitOfWork:\n    def __init__(self): self.new, self.dirty, self.deleted = [], [], []\n    def register_new(self, e): self.new.append(e)\n    def commit(self): [repo.insert(e) for e in self.new]; ...\n\n**State** — поведение от состояния:\n  class State: def handle(self, ctx): raise NotImplementedError\n  class Context: def __init__(self): self.state = StateA()\n  def request(self): self.state.handle(self)  # state может сменить self.state\n\n**Template Method** — скелет в базовом классе:\n  class Abstract:\n    def template(self): self.step1(); self.step2()  # step2 — переопределяют\n    def step1(self): ...\n    def step2(self): raise NotImplementedError' }
];

/** Блоки: id, title, questionIds */
const BLOCKS = [
  { id: 'basic', title: 'Python Core', questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20] },
  { id: 'oop', title: 'OOP / Python Internals', questionIds: [9, 10, 11, 12, 13, 14, 15, 16] },
  { id: 'algorithms', title: 'Algorithms / Big O', questionIds: [] },
  { id: 'db', title: 'DB / ORM / Transactions', questionIds: [21, 22, 23, 24, 25] },
  { id: 'web', title: 'Web / Network / REST', questionIds: [26, 27, 28, 29] },
  { id: 'architecture', title: 'Architecture / Patterns', questionIds: [30, 31, 32, 33, 34] }
];

(function () {
  const blocksEl = document.getElementById('blocks');
  const modalEl = document.getElementById('modal');
  const modalQuestion = modalEl.querySelector('.modal-question');
  const modalAnswer = modalEl.querySelector('.modal-answer');
  const modalClose = modalEl.querySelector('.modal-close');
  const modalBackdrop = modalEl.querySelector('.modal-backdrop');
  const modalContent = modalEl.querySelector('.modal-content');

  const questionsById = {};
  QUESTIONS.forEach(function (item) { questionsById[item.id] = item; });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /** В тексте **фраза** → жирное выделение (ключевые куски). */
  function formatKeyPhrases(rawLine) {
    const parts = rawLine.split(/\*\*(.+?)\*\*/g);
    let html = '';
    for (var i = 0; i < parts.length; i++) {
      var seg = escapeHtml(parts[i]);
      if (i % 2 === 1) html += '<strong class="answer-key">' + seg + '</strong>';
      else html += seg;
    }
    return html;
  }

  /** Строки с 2+ пробелов/таб — код; остальные — параграфы. Строки, оканчивающиеся на ":" — подзаголовки. **фраза** — ключевое. */
  function formatAnswer(text) {
    if (!text || typeof text !== 'string') return '';
    const lines = text.split('\n');
    var out = '';
    var inCode = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var isCodeLine = /^\s{2,}/.test(line) || /^\t/.test(line);
      if (isCodeLine) {
        if (!inCode) { out += '<pre class="answer-code"><code>'; inCode = true; }
        out += escapeHtml(line) + '\n';
      } else {
        if (inCode) { out += '</code></pre>'; inCode = false; }
        if (line.length) {
          var isHeading = line.slice(-1) === ':' && line.length < 160;
          var lineHtml = formatKeyPhrases(line);
          out += isHeading ? '<p class="answer-heading">' + lineHtml + '</p>' : '<p>' + lineHtml + '</p>';
        } else {
          out += '<p class="answer-space">&nbsp;</p>';
        }
      }
    }
    if (inCode) out += '</code></pre>';
    return out;
  }

  function openModal(item) {
    modalQuestion.textContent = item.question;
    modalAnswer.innerHTML = formatAnswer(item.answer);
    modalEl.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalEl.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  BLOCKS.forEach(function (block) {
    const section = document.createElement('section');
    section.className = 'block';
    section.id = block.id;
    const h2 = document.createElement('h2');
    h2.className = 'block-title';
    h2.textContent = block.title;
    section.appendChild(h2);
    const cardsWrap = document.createElement('div');
    cardsWrap.className = 'cards';
    block.questionIds.forEach(function (qId, index) {
      const item = questionsById[qId];
      if (!item) return;
      const card = document.createElement('div');
      card.className = 'card';
      const numInBlock = index + 1;
      card.innerHTML = '<span class="card-id">' + numInBlock + '</span><span class="card-question">' + escapeHtml(item.question) + '</span>';
      card.addEventListener('click', function () { openModal(item); });
      cardsWrap.appendChild(card);
    });
    section.appendChild(cardsWrap);
    blocksEl.appendChild(section);
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  modalContent.addEventListener('click', function (e) { e.stopPropagation(); });
  modalEl.addEventListener('click', function (e) {
    if (e.target === modalEl) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalEl.classList.contains('modal-open')) closeModal();
  });
})();
