/** Вопросы и ответы: id, question, answer */
const QUESTIONS = [
  { id: 1, question: 'Что такое Python?', answer: 'Python — высокоуровневый интерпретируемый язык программирования с динамической и строгой типизацией. В стандартной реализации (CPython) исходный код сначала компилируется в байт-код (.pyc), который затем исполняется виртуальной машиной Python. Python ориентирован на читаемость кода, быструю разработку и широкую экосистему библиотек.' },
  { id: 2, question: 'Какие типы данных есть в Python?', answer: 'Типы делятся на изменяемые и неизменяемые. Изменяемые: list, dict, set — могут изменяться после создания. Неизменяемые: int, float, complex, bool, str, tuple, frozenset — при изменении создаётся новый объект.' },
  { id: 3, question: 'Какие структуры данных есть в Python?', answer: 'В Python реализованы базовые структуры данных: список (динамический массив), кортеж (неизменяемая последовательность), словарь (хэш-таблица), множество, строка, range. Также логически используются стек, очередь, деревья и графы (обычно через библиотеки или пользовательские реализации).' },
  { id: 4, question: 'Что такое lambda-функция?', answer: 'Lambda — анонимная функция, ограниченная одним выражением. Чаще всего используется как аргумент функций высшего порядка (map, filter, sorted) или там, где полноценное def избыточно.' },
  { id: 5, question: 'В чём разница между list и tuple?', answer: 'list — изменяемый тип данных, tuple — неизменяемый. tuple работает быстрее, потребляет меньше памяти и может использоваться как ключ словаря. Важно: изменить элементы tuple нельзя, но можно создать новый tuple на основе старого.' },
  { id: 6, question: 'Что такое генератор?', answer: 'Генератор — объект, возвращающий значения по одному по запросу. Создаётся с помощью yield или generator comprehension. Генераторы экономят память, так как не хранят все значения сразу, и часто используются для работы с потоками данных.' },
  { id: 7, question: 'Что такое итератор?', answer: 'Итератор — объект, который поддерживает протокол итерации (__iter__, __next__). Итератор хранит текущее состояние перебора и выбрасывает StopIteration, когда элементы заканчиваются.' },
  { id: 8, question: 'Что такое list/dict comprehension?', answer: 'Синтаксический сахар для компактного создания коллекций. Повышает читаемость кода и часто работает быстрее, чем эквивалентные циклы for.' },
  { id: 9, question: 'Что такое *args и **kwargs?', answer: 'Используются для передачи переменного количества аргументов. *args собирает позиционные аргументы в кортеж, **kwargs — именованные аргументы в словарь. Часто применяются в декораторах и обёртках.' },
  { id: 10, question: 'Основные принципы ООП?', answer: 'Абстракция — выделение ключевых характеристик объекта. Инкапсуляция — скрытие реализации и контроль доступа. Наследование — повторное использование логики. Полиморфизм — единый интерфейс для разных реализаций.' },
  { id: 11, question: 'Разница между __new__(), __init__(), __call__()?', answer: '__new__ создаёт объект в памяти. __init__ инициализирует уже созданный объект. __call__ позволяет вызывать экземпляр класса как функцию.' },
  { id: 12, question: 'Что такое декоратор?', answer: 'Декоратор — функция, которая принимает другую функцию и возвращает новую, расширяя или изменяя её поведение. Часто используется для логирования, авторизации, кэширования.' },
  { id: 13, question: 'Что такое дескрипторы?', answer: 'Дескрипторы — это классы, управляющие доступом к атрибутам других классов. Используются, например, в property, ORM и системах валидации.' },
  { id: 14, question: '@staticmethod / @classmethod / @property?', answer: '@staticmethod — логически связан с классом, но не использует self или cls. @classmethod — работает с классом и его состоянием. @property — позволяет обращаться к методу как к атрибуту.' },
  { id: 15, question: 'Что такое __slots__?', answer: '__slots__ ограничивает динамическое создание атрибутов и снижает потребление памяти, что важно при большом количестве объектов.' },
  { id: 16, question: 'Что такое MRO?', answer: 'MRO определяет порядок поиска методов при множественном наследовании. В Python используется алгоритм C3 для предотвращения конфликтов.' },
  { id: 17, question: 'Что такое метаклассы?', answer: 'Метаклассы управляют созданием классов. Используются для валидации, регистрации классов и построения фреймворков.' },
  { id: 18, question: 'Что такое GIL?', answer: 'Global Interpreter Lock ограничивает одновременное выполнение байт-кода одним потоком в CPython. Это упрощает управление памятью, но снижает эффективность CPU-bound задач.' },
  { id: 19, question: 'Как работает сборщик мусора?', answer: 'Основной механизм — подсчёт ссылок. Дополнительно GC ищет циклические ссылки, которые не могут быть удалены автоматически.' },
  { id: 20, question: 'Поверхностная и глубокая копия?', answer: 'Shallow copy копирует только верхний уровень объекта. Deep copy рекурсивно копирует все вложенные объекты.' },
  { id: 21, question: 'Как Python работает под капотом?', answer: 'Код компилируется в байт-код и выполняется виртуальной машиной Python. Это позволяет переносимость между платформами.' },
  { id: 22, question: 'Что такое O-нотация?', answer: 'O-нотация описывает асимптотическую сложность алгоритма и позволяет сравнивать эффективность решений независимо от размера входных данных.' },
  { id: 23, question: 'Сложность операций list?', answer: 'Доступ по индексу — O(1). Поиск и удаление — O(n). Сортировка — O(n log n).' },
  { id: 24, question: 'Сложность dict / set?', answer: 'Средняя сложность вставки, поиска и удаления — O(1). В худшем случае возможна деградация до O(n).' },
  { id: 25, question: 'Что такое рекурсия?', answer: 'Метод решения задач, при котором функция вызывает саму себя. Важно наличие базового случая для предотвращения бесконечного вызова.' },
  { id: 26, question: 'Что такое ORM?', answer: 'ORM связывает объектную модель приложения с реляционной моделью БД, скрывая SQL-логику за Python-объектами.' },
  { id: 27, question: 'Что такое миграции?', answer: 'Механизм версионирования схемы БД, позволяющий безопасно изменять структуру таблиц.' },
  { id: 28, question: 'Что такое транзакция?', answer: 'Последовательность операций с БД, выполняемая как единое целое.' },
  { id: 29, question: 'Что такое ACID?', answer: 'Набор гарантий корректности транзакций: атомарность, согласованность, изолированность, надёжность.' },
  { id: 30, question: 'Что такое индексирование БД?', answer: 'Создание дополнительных структур данных для ускорения поиска и фильтрации.' },
  { id: 31, question: 'Что такое REST?', answer: 'REST — архитектурный стиль построения API поверх HTTP с отсутствием состояния и единообразным интерфейсом.' },
  { id: 32, question: 'Этапы работы HTTP?', answer: 'DNS → IP → HTTP-запрос → HTTP-ответ → обработка результата.' },
  { id: 33, question: 'Что такое сериализация и десериализация?', answer: 'Сериализация — преобразование объектов в формат передачи. Десериализация — восстановление объектов из этого формата.' },
  { id: 34, question: 'TCP и UDP?', answer: 'TCP — надёжный, гарантирует доставку. UDP — быстрый, без гарантий, используется для стриминга и игр.' },
  { id: 35, question: 'Чем библиотека отличается от фреймворка?', answer: 'Библиотека вызывается из пользовательского кода. Фреймворк управляет потоком выполнения и вызывает пользовательский код.' },
  { id: 36, question: 'Что такое SOLID?', answer: 'Набор принципов проектирования, повышающих гибкость, расширяемость и поддерживаемость кода.' },
  { id: 37, question: 'GOF23 Паттерны проектирования', answer: 'GOF23 — классические шаблоны проектирования, описанные «бандой четырёх». Они делятся на три группы: Порождающие — управляют созданием объектов (Singleton, Factory, Abstract Factory, Builder, Prototype). Структурные — управляют связями между объектами (Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight). Поведенческие — управляют взаимодействием объектов (Command, Chain of Responsibility, Observer, Strategy, Unit of Work). Используются для повторного применения проверенных архитектурных решений и снижения связности кода.' }
];

/** Блоки: id, title, questionIds */
const BLOCKS = [
  { id: 'basic', title: 'Basic / Python Core', questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: 'oop', title: 'OOP / Python Internals', questionIds: [10, 11, 12, 13, 14, 15, 16, 17] },
  { id: 'memory', title: 'Memory / Performance', questionIds: [18, 19, 20, 21] },
  { id: 'algorithms', title: 'Algorithms / Big O', questionIds: [22, 23, 24, 25] },
  { id: 'db', title: 'DB / ORM / Transactions', questionIds: [26, 27, 28, 29, 30] },
  { id: 'web', title: 'Web / Network / REST', questionIds: [31, 32, 33, 34] },
  { id: 'architecture', title: 'Architecture / Patterns', questionIds: [35, 36, 37] }
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

  function openModal(item) {
    modalQuestion.textContent = item.question;
    modalAnswer.textContent = item.answer;
    modalEl.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalEl.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
    block.questionIds.forEach(function (qId) {
      const item = questionsById[qId];
      if (!item) return;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<span class="card-id">' + item.id + '</span><span class="card-question">' + escapeHtml(item.question) + '</span>';
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
