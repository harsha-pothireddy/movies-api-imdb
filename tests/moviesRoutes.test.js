"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = require("supertest");
var express_1 = require("express");
var moviesRoutes_1 = require("../routes/v1/moviesRoutes"); // <-- your TS route file
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/movies", moviesRoutes_1.default);
describe("IMDB Movies API Test Suite", function () {
    // ----------------- HEALTH -----------------
    it("TEST 1 : Should return health check", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/health")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("status", "ok");
                    expect(res.body).toHaveProperty("apiVersion", "v1");
                    return [2 /*return*/];
            }
        });
    }); });
    // ----------------- YEAR -----------------
    it("TEST 2 : Should return movies for a valid year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/year/2020?page=1")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("results");
                    expect(res.body.results).toBeInstanceOf(Array);
                    expect(res.body.results.length).toBeGreaterThan(0);
                    res.body.results.forEach(function (movie) {
                        expect(movie).toHaveProperty("title");
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("TEST 3 : Should return 400 for invalid year", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/year/abcd")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty("error", "Invalid year parameter");
                    return [2 /*return*/];
            }
        });
    }); });
    it("TEST 4 : Should return 404 for year with no movies", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/year/1800")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toHaveProperty("error", "No movies found for year 1800, page 1");
                    return [2 /*return*/];
            }
        });
    }); });
    // ----------------- GENRE -----------------
    it("TEST 5 : Should return movies for a valid genre", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/genre/Action")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("results");
                    expect(res.body.results).toBeInstanceOf(Array);
                    expect(res.body.results.length).toBeGreaterThan(0);
                    res.body.results.forEach(function (movie) {
                        expect(movie).toHaveProperty("title");
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("TEST 6 : Should return 404 for genre with no movies", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/genre/UnknownGenre")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toHaveProperty("error", "No movies found for genre UnknownGenre, page 1");
                    return [2 /*return*/];
            }
        });
    }); });
    // ----------------- PAGINATION -----------------
    it("TEST 7 : Should return paginated movies", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies?page=1")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("results");
                    expect(res.body.results).toBeInstanceOf(Array);
                    expect(res.body.results.length).toBeGreaterThan(0);
                    res.body.results.forEach(function (movie) {
                        expect(movie).toHaveProperty("title");
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("TEST 8 : Should return 404 for page with no movies", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies?page=9999")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toHaveProperty("message", "No movies found for page 9999");
                    return [2 /*return*/];
            }
        });
    }); });
    // ----------------- MOVIE DETAILS -----------------
    it("TEST 9 : Should return movie details for a valid imdbId", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/tt0111161")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("title", "The Shawshank Redemption");
                    expect(res.body).toHaveProperty("imdbId", "tt0111161");
                    expect(res.body).toHaveProperty("averageRating");
                    return [2 /*return*/];
            }
        });
    }); });
    it("TEST 10 : Should return 404 for invalid imdbId", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/v1/movies/invalidImdbId")];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(404);
                    expect(res.body).toHaveProperty("error", "Movie not found");
                    return [2 /*return*/];
            }
        });
    }); });
});
