# Авиахакатон МАИ 2022

В данном проекте представлена реализация системы управления пассажирскими автобусами в аэропорту. В проекте присутствует Web-сервис для диспетчера, мобильное приложение для самих водителей, связующий их бэкенд и алгоритм автоматического оптимизированного распределения задач между водителями.

### Разработчики

## Структура проекта

Проект состоит из 3-ех частей:
- Web frontend, написанный на JavaScript
- Mobile frontend, написанный с помощью фреймворка Flutter
- Golang Server

## JavaScript

## Flutter (Mobile)
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
