import 'dart:async';
import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/controllers/home_controller.dart';
import 'package:avia_hackathon/navigation/router.gr.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:avia_hackathon/utils/enums.dart';
import 'package:avia_hackathon/utils/tack_model.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:avia_hackathon/widgets/dialogs.dart';
import 'package:avia_hackathon/widgets/main_card_states.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bounce/flutter_bounce.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Объект класса контроллера
  final hc = Get.find<HomeController>();
  final currentTask = TaskModel();

  // Таймер
  Timer? countdownTimer;
  Duration myDuration = const Duration(minutes: 15);

  // Сброс таймера
  void resetTimer() {
    if (countdownTimer != null) {
      stopTimer();
    }
    setState(() => myDuration = const Duration(minutes: 15));
    startTimer();
  }

  // Запуск таймера
  void startTimer() {
    countdownTimer =
        Timer.periodic(const Duration(seconds: 1), (_) => setCountDown());
  }

  // Стоп таймера
  void stopTimer() {
    setState(() => countdownTimer!.cancel());
  }

  // Установка текущего состояния таймера
  void setCountDown() {
    const reduceSecondsBy = 1;
    setState(() {
      final seconds = myDuration.inSeconds - reduceSecondsBy;
      if (seconds < 0) {
        countdownTimer!.cancel();
        if (hc.state.value == HomeState.resting) {
          AppDialogs().callRestDialogWithOptions(context);
        }
      } else {
        myDuration = Duration(seconds: seconds);
      }
    });
  }

  String strDigits(int n) => n.toString().padLeft(2, '0');

  @override
  void initState() {
    super.initState();
    hc.getTaskList();
  }

  @override
  void dispose() {
    super.dispose();
    if (countdownTimer != null) {
      countdownTimer!.cancel();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        leftBar(context),
        Expanded(
          child: Column(
            children: [
              const Spacer(flex: 45),
              mainTaskCard(),
              const Spacer(flex: 30),
              Row(
                children: [
                  const Spacer(),
                  toolTip(),
                ],
              ),
              const SizedBox(height: 20),
            ],
          ),
        )
      ],
    );
  }

  // Виджет карточки текущего задания
  Widget mainTaskCard() {
    final minutes = strDigits(myDuration.inMinutes.remainder(60));
    final seconds = strDigits(myDuration.inSeconds.remainder(60));
    return Container(
      width: 768,
      height: 611,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Obx(
        () {
          if (hc.taskList.isEmpty && hc.state.value != HomeState.resting) {
            return MainCardStates().loadingState();
          } else {
            switch (hc.state.value) {
              case HomeState.loading:
                return MainCardStates().loadingState();
              case HomeState.resting:
                return MainCardStates().restState(context, minutes, seconds);
              case HomeState.taskWaiting:
              case HomeState.taskDone:
                final task = hc.taskList.values.first;
                final isActive = hc.state.value == HomeState.taskDone;
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 44),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const SizedBox(height: 33),
                              Text(
                                'Текущая задача',
                                style: AppTextStyles.heading1(),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 5),
                                child: Text(
                                  taskTypeName(task!.taskType),
                                  style: AppTextStyles.smallText().copyWith(
                                    fontSize: 22,
                                    height: 26.63 / 22,
                                    color: AppColors.greyText,
                                  ),
                                ),
                              )
                            ],
                          ),
                          const Spacer(),
                          if (isActive) ...[
                            _buildActiveTaskFlag(),
                            const SizedBox(width: 24),
                          ],
                          Padding(
                            padding: const EdgeInsets.only(top: 33),
                            child: Row(
                              children: [
                                Image.asset(
                                  task.taskType == TaskType.takeOff
                                      ? Assets.planeTakeOff
                                      : Assets.planeLanding,
                                  height: 39,
                                ),
                                const SizedBox(width: 14),
                                Text(
                                  task.timeStart,
                                  style: AppTextStyles.heading1(),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 41),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Кол-во пасажиров: ${task.passengersNumber.toString()}\nВремя выполнения: ${task.timeForExecute} мин.\nМестонахождение: ${task.startRoute}',
                            style: AppTextStyles.mainText(),
                          ),
                          const Spacer(),
                          Text(
                            'Пункт посадки: ${task.middleRoute}\nПункт высадки: ${task.endRoute}',
                            style: AppTextStyles.mainText(),
                          ),
                        ],
                      ),
                      const Spacer(flex: 44),
                      Text('Схема проезда:', style: AppTextStyles.mainText()),
                      const SizedBox(height: 42),
                      Row(
                        children: [
                          routeDot(task.startRoute, isActive: isActive),
                          const Spacer(),
                          routeArrow(task.timeToMiddle),
                          const Spacer(),
                          routeDot(task.middleRoute, isActive: isActive),
                          const Spacer(),
                          routeArrow(task.timeToEnd),
                          const Spacer(),
                          routeDot(task.endRoute, isActive: isActive),
                        ],
                      ),
                      const Spacer(flex: 50),
                      if (task.busMates.isNotEmpty)
                        Text(
                          'С вами поедут: ${task.busMates.join(', ')}',
                          style: AppTextStyles.mainText(),
                        ),
                      const Spacer(flex: 51),
                      if (hc.state.value == HomeState.taskWaiting)
                        AppButton(
                          title: 'Принять',
                          onTap: () {
                            hc.setState(HomeState.taskDone);
                          },
                        ),
                      if (hc.state.value == HomeState.taskDone)
                        AppButton(
                          title: 'Выполнено',
                          color: AppColors.orange,
                          onTap: () {
                            hc
                              ..setTaskStatusDone(task.taskId)
                              ..setState(HomeState.taskWaiting);
                          },
                        ),
                      const SizedBox(height: 29),
                    ],
                  ),
                );
            }
          }
        },
      ),
    );
  }

  Container _buildActiveTaskFlag() {
    const radius = Radius.circular(14);
    return Container(
      width: 86,
      decoration: const BoxDecoration(
        color: AppColors.orange,
        borderRadius: BorderRadius.only(
          bottomLeft: radius,
          bottomRight: radius,
        ),
      ),
      padding: const EdgeInsets.only(
        top: 10,
        left: 10,
        right: 10,
        bottom: 18,
      ),
      child: SvgPicture.asset(Assets.taskActive),
    );
  }

  String taskTypeName(TaskType type) {
    if (type == TaskType.landing) {
      return 'Высадка из самолета';
    } else {
      return 'Посадка на самолет';
    }
  }

  Column routeArrow(String time) {
    return Column(
      children: [
        SvgPicture.asset(Assets.arrow),
        Text('$time минут', style: AppTextStyles.smallText())
      ],
    );
  }

  Column routeDot(String route, {bool isActive = false}) {
    return Column(
      children: [
        Container(
          height: 19.71,
          width: 19.71,
          decoration: BoxDecoration(
            color: isActive ? AppColors.orange : Colors.black,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(height: 3.17),
        Text(
          route,
          style: AppTextStyles.smallText().copyWith(
            fontSize: 16,
            height: 19.36 / 16,
          ),
        )
      ],
    );
  }

  // Виджет нижнего вспомогательного меню
  Widget toolTip() {
    return Align(
      alignment: Alignment.bottomRight,
      child: Container(
        height: 96,
        padding: const EdgeInsets.symmetric(vertical: 13),
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            bottomLeft: Radius.circular(20),
          ),
          color: AppColors.lightGrey,
        ),
        child: Obx(
          () => Row(
            children: [
              const SizedBox(width: 33),
              if (hc.state.value != HomeState.resting) ...[
                toolTipButton(0, onTap: () async {
                  final res = await AppDialogs().showDialogWindow(
                    context,
                    DialogState.takingRest,
                  );
                  if (res) {
                    hc.setState(HomeState.resting);
                    resetTimer();
                  }
                }),
                const SizedBox(width: 26)
              ],
              toolTipButton(1, onTap: () async {
                final res = await AppDialogs().showDialogWindow(
                  context,
                  DialogState.alert,
                );
                if (res) {
                  context.router.push(const AlertRouter());
                }
              }),
              const SizedBox(width: 26),
              toolTipButton(2, onTap: () async {
                final res = await AppDialogs().showDialogWindow(
                  context,
                  DialogState.exit,
                );
                if (res) {
                  await hc.cancel();
                  context.router.replaceAll([const OnBoardingRouter()]);
                }
              }),
              const SizedBox(width: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget toolTipButton(int index, {required Function() onTap}) {
    final buttonsIcons = [
      Padding(
        padding: const EdgeInsets.only(
          left: 9,
          top: 14,
          bottom: 15,
          right: 13,
        ),
        child: SvgPicture.asset(Assets.rest),
      ),
      Padding(
        padding: const EdgeInsets.only(
          left: 14,
          top: 9,
          bottom: 13,
          right: 8,
        ),
        child: SvgPicture.asset(Assets.alert),
      ),
      Padding(
        padding: const EdgeInsets.all(14),
        child: SvgPicture.asset(Assets.exit),
      ),
    ];

    return Bounce(
      duration: const Duration(milliseconds: 150),
      onPressed: () {
        onTap();
      },
      child: AspectRatio(
        aspectRatio: 1.0,
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.mainBlack,
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(
                blurRadius: 12,
                offset: const Offset(3, 6),
                color: Colors.black.withOpacity(0.5),
              ),
            ],
          ),
          child: buttonsIcons[index],
        ),
      ),
    );
  }

  // Виджет левого бара с задачами
  Widget leftBar(BuildContext context) {
    final barWidth = MediaQuery.of(context).size.width / 3;
    return Obx(
      () => Container(
        width: barWidth,
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(topRight: Radius.circular(40)),
          color: AppColors.darkGrey,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 46, top: 39),
              child: Text(
                'Список задач',
                style: AppTextStyles.heading1(),
              ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: CustomScrollView(
                slivers: [
                  if (hc.state.value == HomeState.loading ||
                      hc.taskList.length <= 1)
                    SliverToBoxAdapter(
                      child: Column(
                        children: [
                          const SizedBox(height: 160),
                          Text(
                            'Тут пока пусто...',
                            style: AppTextStyles.heading1(
                                fontWeight: FontWeight.w400),
                          ),
                          const SizedBox(height: 12),
                          SvgPicture.asset(Assets.zero),
                        ],
                      ),
                    )
                  else
                    SliverPadding(
                      padding:
                          const EdgeInsets.only(top: 10, left: 37, right: 37),
                      sliver: SliverList(
                        delegate: SliverChildListDelegate(
                          List.generate(
                            hc.taskList.length - 1,
                            (i) => sideTaskCard(
                              i,
                              hc.taskList.values.elementAt(i + 1),
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Виджет карточки следующих заданий
  Widget sideTaskCard(int i, TaskModel task) {
    return Container(
      height: 276,
      width: 402,
      margin: const EdgeInsets.only(bottom: 26),
      padding: const EdgeInsets.only(top: 16, left: 23, right: 15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 4,
            offset: const Offset(2, 4),
          ),
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            child: Align(
              alignment: Alignment.topRight,
              child: Text(
                task.timeStart,
                style: AppTextStyles.smallText(
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 5),
              Text(
                'Описание задачи:',
                style: AppTextStyles.mainText(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 27.83),
              Text(
                'Кол-во пасажиров: ${task.passengersNumber.toString()}',
                style: AppTextStyles.smallText(),
              ),
              const SizedBox(height: 8.63),
              Text(
                'Время на выполнение: ${task.timeForExecute} мин.',
                style: AppTextStyles.smallText(),
              ),
              const SizedBox(height: 8.63),
              Text(
                'Тип задачи: ${taskTypeName(task.taskType).toLowerCase()}',
                style: AppTextStyles.smallText(),
              ),
              const Spacer(),
              SizedBox(
                height: 50,
                width: 358,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    routeDot(task.middleRoute),
                    const SizedBox(width: 5),
                    Expanded(
                      child: SvgPicture.asset(
                        Assets.arrow,
                        fit: BoxFit.fitWidth,
                      ),
                    ),
                    const SizedBox(width: 5),
                    routeDot(task.endRoute),
                  ],
                ),
              ),
              if (i == 0)
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'Следующая задача',
                      style: AppTextStyles.smallText(color: AppColors.greyText),
                    ),
                    const SizedBox(width: 7),
                    SvgPicture.asset(Assets.doubleArrow)
                  ],
                )
              else
                const SizedBox(height: 19.09),
              const SizedBox(height: 13.89),
            ],
          ),
        ],
      ),
    );
  }
}
