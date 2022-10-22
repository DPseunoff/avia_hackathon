import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

abstract class AppTextStyles {
  static TextStyle heading1({
    double fontSize = 32,
    double height = 38.73 / 32,
    Color color = Colors.black,
    FontWeight fontWeight = FontWeight.w700,
  }) =>
      GoogleFonts.inter(
        fontSize: fontSize,
        height: height,
        color: color,
        fontWeight: fontWeight,
      );

  static TextStyle heading2({
    double fontSize = 24,
    double height = 29.05 / 24,
    Color color = Colors.black,
    FontWeight fontWeight = FontWeight.w700,
  }) =>
      GoogleFonts.inter(
        fontSize: fontSize,
        height: height,
        color: color,
        fontWeight: fontWeight,
      );

  static TextStyle mainText({
    double fontSize = 24,
    double height = 29.05 / 24,
    Color color = Colors.black,
    FontWeight fontWeight = FontWeight.w400,
  }) =>
      GoogleFonts.inter(
        fontSize: fontSize,
        height: height,
        color: color,
        fontWeight: fontWeight,
      );

  static TextStyle smallText({
    double fontSize = 18,
    double height = 21.78 / 18,
    Color color = Colors.black,
    FontWeight fontWeight = FontWeight.w400,
  }) =>
      GoogleFonts.inter(
        fontSize: fontSize,
        height: height,
        color: color,
        fontWeight: fontWeight,
      );

  static TextStyle warningText({
    double fontSize = 42,
    double height = 50.83 / 42,
    Color color = Colors.black,
    FontWeight fontWeight = FontWeight.w700,
  }) =>
      GoogleFonts.inter(
        fontSize: fontSize,
        height: height,
        color: color,
        fontWeight: fontWeight,
      );
}
