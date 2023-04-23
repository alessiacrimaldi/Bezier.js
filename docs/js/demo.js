import { CodeExample } from "./code-example.js";
import handleInteraction from "../../dist/interaction.js";
import * as calculation from "../../dist/calculation.js";
import * as drawing from "../../dist/drawing.js";


var code = new CodeExample(),
    canvas = code.getCanvas(),
    context = code.getContext(),
    curveType = code.getCurveType(),
    restartBtn = code.getRestartBtn();

handleInteraction(canvas, context, curveType, restartBtn, execute);
drawing.setContext(context);


// Write your code here
function execute(curve, evt) {
    /* BÉZIER CURVE */

    calculation.calculateCurvePoints(curve);
    drawing.drawSkeleton(curve);
    drawing.drawCurve(curve);



    /* CURVE LOOKUP TABLE */

    // var lut = calculation.getLookUpTable(curve, 16);
    // drawing.drawSkeleton(curve);
    // drawing.drawLookUpTable(lut, 3.5, "green");



    /* CURVE LENGTH */

    // var length = calculation.calculateLength(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawLength(curve, length, "blue"); 



    /* CURVE POINT */

    // var curvept = calculation.getCurvePoint(curve, 0.65, true);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurvePoint(curvept, 5, "red");



    /* TANGENT */

    /* tangent relative to a given t value */
    // var tangent = calculation.calculateTangent(curve, 0.25);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawTangent(curve, tangent, 0.25, "purple");

    /* all tangents along the curve interval with given gap */
    // var tangents = calculation.calculateTangents(curve, 0.1);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawTangents(curve, tangents, 0.1, "purple");



    /* NORMAL */

    /* normal relative to a given t value */
    // var normal = calculation.calculateNormal(curve, 0.4);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawNormal(curve, normal, 0.4, 30);

    /* all nromals along the curve interval with given gap */
    // var normals = calculation.calculateNormals(curve, 0.1);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawNormals(curve, normals, 0.1);



    /* SPLIT */

    /* curve splitting in a given t value */
    // var segment = calculation.splitCurve(curve, 0.25);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve, "lightgrey");
    // drawing.drawSplittedCurve(curve, segment, "magenta", 0.25);

    /* curve splitting in two given t values */
    // var segments = calculation.splitCurve(curve, 0.25, 0.75);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve, "lightgrey");
    // drawing.drawSplittedCurve(curve, segments, "magenta", 0.25, 0.75);



    /* EXTREMA */

    // var extremas = calculation.calculateCurveExtremas(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurveExtremas(curve, extremas, 4, "red");



    /* INFLECTIONS POINTS */

    // var inflectionp = calculation.calculateInflectionPoints(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawInflectionPoints(curve, inflectionp, 5, "blue");



    /* CURVATURE */

    /* curvature relative to a given t value */
    // var curvature = calculation.calculateCurvature(curve, 0.25);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurvature(curve, curvature, 0.25);

    /* all curvatures relatives to values along the curve interval with given gap */
    // var curvatures = calculation.calculateCurvatures(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurvatures(curve, curvatures);



    /* BOUNDING BOX */

    // var bbox = calculation.calculateBoundingBox(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawBoundingBox(bbox, "cyan");

    // var bbox = calculation.calculateBoundingBox(curve);
    // var extremas = calculation.calculateCurveExtremas(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawBoundingBox(bbox, "cyan");
    // drawing.drawCurveExtremas(curve, extremas, 4, "blue");



    /* HULL POINTS */

    // var hull = calculation.calculateHullPoints(curve, 0.5);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawHullPoints(hull, "green");



    /* POINT PROJECTION */

    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // if (evt) {
    //     let mousep = { x: evt.offsetX, y: evt.offsetY };
    //     let curvep = calculation.calculateClosestPoint(curve, mousep);
    //     drawing.drawProjection(curvep, mousep, "magenta");
    // }



    /* OFFSET CURVE AND POINT */

    // var offsetCurve = calculation.calculateOffset(curve, 25),
    //     offsetCoords = calculation.calculateOffset(curve, 25, 0.5);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawOffsetCurve(offsetCurve, "lightgray");
    // drawing.drawOffsetPoint(offsetCoords, "purple");



    /* REDUCED CURVE */

    // var reduced = calculation.calculateReducedCurve(curve);
    // drawing.drawSkeleton(curve);
    // if (reduced.length > 0) {
    //     drawing.drawReducedCurve(reduced);
    // } else {
    //     drawing.drawCurve(curve);
    // }



    /* CIRCULAR ARCS */

    // var circularArcs = calculation.calculateArcs(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCircularArcs(circularArcs);


    /* SCALED CURVE */

    // var reduced = calculation.calculateReducedCurve(curve),
    //     len = reduced.length,
    //     scaledCurves = calculation.calculateScaledCurve(curve, reduced[(len / 2) | 0]);
    // drawing.drawSkeleton(curve);
    // if (len > 0) {
    //     drawing.drawScaledCurve(reduced, scaledCurves, "green");
    // } else {
    //     drawCurve(curve);
    // }



    /* CURVE OUTLINE */

    /* outline with one given d value */
    // var outline = calculation.calculateOutline(curve, 30),
    //     offset = {
    //         pos: calculation.calculateOffset(outline, 10),
    //         neg: calculation.calculateOffset(outline, -10)
    //     };
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurveOutline(outline, "red", offset);

    /* outline with two given d values */
    // var outline = calculation.calculateOutline(curve, 10, 50),
    //     offset = {
    //         pos: calculation.calculateOffset(outline, 10),
    //         neg: calculation.calculateOffset(outline, -10)
    //     };
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurveOutline(outline, "red", offset);



    /* CURVE GRADUATED OUTLINE */

    // var gradOutline = calculation.calculateOutline(curve, 5, 10, 25, 25);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurveGradOutline(gradOutline);



    /* CURVE SHAPED OUTLINE */

    /* shaped outline with one given d value */
    // var shapedOutline = calculation.calculateShapedOutline(curve, 25);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawShapedOutline(shapedOutline, "blue");

    /* shaped outline with two given d values */
    // var shapedOutline = calculation.calculateShapedOutline(curve, 25, 40);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawShapedOutline(shapedOutline, "blue", "transparent");

    /* shaped outline with two given d values and curveIntersectionThreshold parameter */
    // var shapedOutline = calculation.calculateShapedOutline(curve, 25, 40, 0.1);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawShapedOutline(shapedOutline, "black", "transparent");


    /* CURVE SELF INTERSECTION */

    // var intersection = calculation.calculateIntersection(curve);
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawSelfIntersection(curve, intersection, 5, "red");



    /* CURVE LINE INTERSECTION */

    // var line = { p1: { x: 350, y: 0 }, p2: { x: 0, y: 300 } },
    //     intersection = calculation.calculateIntersection(curve, line);
    // drawing.drawLine(line.p1, line.p2, "red");
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawLineIntersection(curve, intersection, 6);



    /* CURVES INTERSECTION */

    // var curve2 = calculation.getCurve([91, 73, 317], [142, 288, 125]),
    //     intersection = calculation.calculateIntersection(curve, curve2, 0.2);
    // drawing.drawCurve(curve2, "red");
    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // drawing.drawCurvesIntersection(curve, intersection, 6);



    /* DOUBLE CURVE SPLIT AND TANGENTS */

    // drawing.drawSkeleton(curve);
    // drawing.drawCurve(curve);
    // /* double curve splitting */
    // var segments = calculation.splitCurve(curve, 0.25);
    // var segments2 = calculation.splitCurve(segments[1], 0.75);
    // drawing.drawSplittedCurve(curve, segments, "red", 0.25);
    // drawing.drawSplittedCurve(segments[1], segments2, "blue", 0.75);
    // /* tangents in the same curve point */
    // var tng = calculation.calculateTangent(curve, 0.25),
    //     splitTng = calculation.calculateTangent(segments2[0], 0);
    // drawing.drawTangent(curve, tng, 0.25, "black");
    // drawing.drawTangent(segments2[0], splitTng, 0, "blue");
}