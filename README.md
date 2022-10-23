# Авиахакатон МАИ 2022
![https://img.shields.io/badge/golang-1.19.2-blue](https://img.shields.io/badge/golang-1.19.2-blue) ![https://img.shields.io/badge/PostgreSQL-15-lightgrey](https://img.shields.io/badge/PostgreSQL-15-lightgrey) ![https://img.shields.io/badge/Dart-2.18-orange](https://img.shields.io/badge/Dart-2.18-orange) ![https://img.shields.io/badge/flutter-3.3.5-green](https://img.shields.io/badge/flutter-3.3.5-green) ![https://img.shields.io/badge/JavaScript-1.8.5-ff69b4](https://img.shields.io/badge/JavaScript-1.8.5-ff69b4)

В данном проекте представлена реализация системы управления пассажирскими автобусами в аэропорту. В проекте присутствует Web-сервис для диспетчера, мобильное приложение для самих водителей, связующий их бэкенд и алгоритм автоматического оптимизированного распределения задач между водителями.

## Оглавление

1. [Структура проекта](#Структура-проекта)
2. [JavaScript](#JavaScript)
3. [Flutter (Mobile)](#Flutter)
4. [Golang](#Golang)
5. [Кто работал над проектом](#Над-проектом-работали)
    
## Структура проекта

Проект состоит из 3-ех частей:
- Web frontend, написанный на JavaScript
- Mobile frontend, написанный с помощью фреймворка Flutter
- Golang Server

## JavaScript

Это позерский язык программирования чуваки считают что они пишут веб лучше, поэтому сильно расписывать не будем.
- React - фреймворк js для создания пользовательских интерфейс.
- 

## Flutter
Для запуска проекта в режиме дебаг требуется Flutter SDK, Dart SDK, Android SDK и эмулятор устройства Android/IOS. Для установки релизной версиии на устройство Android достаточно установить сгенерированный файл с расширением .apk.

В проекте представлена следующая структура директорий:
- assets - все ассеты (png, svg, lottie)
- pages - экраны
- widgets - виджеты, используемые на разных экранах
- utils - вспомогательные функции и классы (пр. класс текстовых стилей)
- controllers - контроллеры GetX
- navigation - хранилище класса AutoRouter и его генерация

Используемые пакеты:
- AutoRoute - настройки навигации
- GetX - реализация реактивного стейт-менеджмента
- RxDart - работа с потоками
- SharedPreferences - хранение данных в памяти устройства
- GoogleFonts - текстовые стили от компании Google
- FlutterSvg - работа с векторными изображениями в формате .svg
- Lottie - работа с Lottie-анимациями
- Bounce - реализация анимации нажатия на кнопки

Работа с приложением:
1. Прохождение регистрации путем ввода имени и выданного диспетчером ID пользователя. Если хотя бы одно поле не заполнено, не произойдет переход на главный экран и появится сообщение об ошибке;
2. На главном экране в правой верхней части происходит основное взаимодействие. Показывается описание текущего задания водителя в полной форме или другая информация;
3. У водителя есть возможность указать начало и окончание выполнения задания. Данная информация отправляется на бэкенд;
4. В левой части главного экрана предоставлен скролящийся список задач, идущих после текущей в порядке очереди. Каждая задача расписана в краткой форме;
5. Дополнительно в нижней правой части экрана присутствует меню, позволяющее водителю взять перерыв, связаться с диспетчером в случае форс-мажора и выход из аккаунта по истечении рабочего дня. При нажатии на одну из трех опций на экране всплывает меню подтверждения;
6. При подтверждении опции "взятия перерыва", на главном экране можно видеть отсчёт оставшегося времени. По истечении данного времени или при нажатии на кнопку "Продолжить работу" водителю требуется указать текущее местоположение для корректного продолжения работы алгоритма выдачи заданий;
7. Допольнительно представлены EmptyState списка задач, LoadingState загрузки задач при запросе с бэкенда, SplashScreen с анимацией при запуске приложения.

## Golang
Для запуска и тестов проекта используется утилита make. Для работы программы используется СУБД PostgreSQL, в которой должна быть база данных c таблицами Flights, Points, Roads.

Структура директорий:
- cmd/apiserver - хранение файла main.go, при запуске которого создается сервер и происходит подключение к базе данных.
- internal/app - внутренние пакеты для работы приложения:
    - airport - методы для загрузки из базы данных информации о рейсах и расстояниях в аэропорте 
    - apiserver - сервер с роутером, который перенаправляет запросы на обработчики
    - models - структуры данных; 
    - tasks - для создания и удаления заданий для автобусов
- pkg - пакеты, которые не привязаны к приложению: 
    - Config - методы для загрузки config файла при инициализации сервера 
    - PostgreSQL - методы для открытия и закрытия подключения к базе данных PostgreSQL.
  
Используемые внешние пакеты:
- gim - высокопроизводительный микрофреймворк, который используется для создания веб-приложений и микросервисов. 
- goraph - пакет для построения графов и нахождения минимальных путей в них.

Алгоритм автоматического распределения заданий:
```
flag = true
пока flag:
    цикл по автобусам:
        если кол-во заданий у автобуса == 0:
            последнее задание = несуществующее задание, которое завершилось в данный момент
        
        время окончания последней задачи автобуса = время начала последней задачи + время на ее выполнение
        
        создаем граф
        ищем минимальные расстояния до всех точек от местоположения автобуса
        
        ищем ближайший по времени рейс, удовлетворяющий условиям:
            1. кол-во пассажиров > 0
            2. автобус успевает доехать до нужной точки до начала задания
        
        если нашли:
            добавляем его в задания
            вычитаем из пассажиров рейса вместимость автобуса
        иначе:
            записываем в переменную, что не нашли подходящий рейс
            
    если ни для одного автобуса не нашли подходящее задание:
        flag = false
```

## Над проектом работали
- Скурихин Григорий - https://github.com/GrishaSkurikhin/
- Псеунов Дамир - https://github.com/DPseunoff/
- Васильев Александр - https://github.com/bac1lla/
- Баталин Дмитрий - https://github.com/DABatalin/
- Хвошнянская Елизавета - https://github.com/LizaKhvoshnyanskaya/
