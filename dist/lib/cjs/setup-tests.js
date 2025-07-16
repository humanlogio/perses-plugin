"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("@testing-library/jest-dom");
// Always mock e-charts during tests since we don't have a proper canvas in jsdom
jest.mock("echarts/core");
