# TODO

- [x] В начале миграции объяснять планируемые верификации и дожидаться выбора
  пользователя. Явный отказ соблюдать при любом режиме; сохранять выбор для
  продолжений без повторных вопросов. При отказе выполнять весь выбранный объём,
  включая исправления кода, контракты, сопутствующие документы, индексы, ссылки
  и записи прогресса, без тестов и других верификаций. Новые документированные
  сущности сразу делать `discoverable`, явно отмечать результат как непроверенный;
  риск неработающего кода принимает пользователь.
- [x] Setup-скилл должен предлагать поэтапную миграцию: определить полный список
  компонентов и лейаутов, сохранить его как чеклист и добавлять контракты для всех
  элементов партиями — по умолчанию по 10 штук за раз.
- [x] При запросе setup предлагать не только миграцию на новую структуру, но и
  отдельный шаг: проанализировать компоненты и предложить, где уместен escape hatch
  по [правилам craft](skills/design-system/reference/craft.md#design-public-apis-and-escape-hatches).
  Переиспользовать существующий механизм исключений; предусмотреть обязательную
  непустую причину и допустимые границы отклонений в контракте, сохраняя гарантии
  поведения и доступности. Не добавлять escape hatch автоматически всем компонентам.

# Further evidence

- Run the DESIGN.md setup on a production codebase, keeping its
  existing source and code paths. Current executable evidence uses mini-ds;
  colocated/nested paths and cross-index links also have checker regression coverage.
- Compare independent scenario runs across model families. A result from one model
  establishes that run only, not universal agent compliance.
- Broaden composition examples beyond settings pages when an actual project supplies
  a second pattern; keep the fixture checks tied to observable requirements.
