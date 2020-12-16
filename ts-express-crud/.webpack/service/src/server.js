/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ \"./src/routes.ts\");\n\n\n\nclass App {\n    constructor() {\n        this.app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n        this.middleware();\n    }\n    middleware() {\n        this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_1__.json({ strict: false }));\n        this.app.use(_routes__WEBPACK_IMPORTED_MODULE_2__.default);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new App().app);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktZXhwcmVzcy1hcHBsaWNhdGlvbi8uL3NyYy9hcHAudHM/MDY2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuXG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuY2xhc3MgQXBwIHtcbiAgICBwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmUoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBtaWRkbGV3YXJlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgc3RyaWN0OiBmYWxzZSB9KSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShyb3V0ZXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFwcCgpLmFwcDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.ts\n");

/***/ }),

/***/ "./src/app/services/users/UserRepository.ts":
/*!**************************************************!*
  !*** ./src/app/services/users/UserRepository.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserRepository\": () => /* binding */ UserRepository\n/* harmony export */ });\n/* harmony import */ var _domain_enum_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../domain/enum/types */ \"./src/domain/enum/types.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _infra_database_DynamoDB__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../infra/database/DynamoDB */ \"./src/infra/database/DynamoDB.ts\");\n\n\n\nclass UserRepository {\n    constructor() {\n        this.USERS_TABLE = process.env.USERS_TABLE;\n        this.dynamoDb = new _infra_database_DynamoDB__WEBPACK_IMPORTED_MODULE_2__.DynamoDbConnection();\n    }\n    getUsers() {\n        const promise = this.dynamoDb.getItems(this.USERS_TABLE, 'userId, #name, birthday, #type');\n        return promise;\n    }\n    createUser(name, type, birthday) {\n        const accountType = this.getType(type);\n        const user = {\n            userId: (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v1)(),\n            name: name,\n            type: accountType,\n            birthday: birthday\n        };\n        const promise = this.dynamoDb.insertItem(this.USERS_TABLE, user);\n        return promise;\n    }\n    getType(type) {\n        if (type === 'gold') {\n            return _domain_enum_types__WEBPACK_IMPORTED_MODULE_0__.AccountTypes.GOLD;\n        }\n        else if (type === 'black') {\n            return _domain_enum_types__WEBPACK_IMPORTED_MODULE_0__.AccountTypes.BLACK;\n        }\n        else if (type === 'platinum') {\n            return _domain_enum_types__WEBPACK_IMPORTED_MODULE_0__.AccountTypes.PLATINUM;\n        }\n        return _domain_enum_types__WEBPACK_IMPORTED_MODULE_0__.AccountTypes.BASIC;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3NlcnZpY2VzL3VzZXJzL1VzZXJSZXBvc2l0b3J5LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktZXhwcmVzcy1hcHBsaWNhdGlvbi8uL3NyYy9hcHAvc2VydmljZXMvdXNlcnMvVXNlclJlcG9zaXRvcnkudHM/Y2ZmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2VudGl0aWVzL3VzZXJzJztcbmltcG9ydCB7IEFjY291bnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9lbnVtL3R5cGVzJztcblxuaW1wb3J0IHsgdjEgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IHsgRHluYW1vRGJDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW5mcmEvZGF0YWJhc2UvRHluYW1vREInO1xuXG5leHBvcnQgY2xhc3MgVXNlclJlcG9zaXRvcnkge1xuICAgIHByaXZhdGUgVVNFUlNfVEFCTEU6IHN0cmluZyA9IHByb2Nlc3MuZW52LlVTRVJTX1RBQkxFO1xuICAgIHByaXZhdGUgZHluYW1vRGI6IER5bmFtb0RiQ29ubmVjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmR5bmFtb0RiID0gbmV3IER5bmFtb0RiQ29ubmVjdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VycygpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5keW5hbW9EYi5nZXRJdGVtcyhcbiAgICAgICAgICAgIHRoaXMuVVNFUlNfVEFCTEUsXG4gICAgICAgICAgICAndXNlcklkLCAjbmFtZSwgYmlydGhkYXksICN0eXBlJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVXNlcihcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGJpcnRoZGF5PzogRGF0ZVxuICAgICk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGFjY291bnRUeXBlID0gdGhpcy5nZXRUeXBlKHR5cGUpO1xuICAgICAgICBjb25zdCB1c2VyOiBVc2VyID0ge1xuICAgICAgICAgICAgdXNlcklkOiB2MSgpLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHR5cGU6IGFjY291bnRUeXBlLFxuICAgICAgICAgICAgYmlydGhkYXk6IGJpcnRoZGF5XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuZHluYW1vRGIuaW5zZXJ0SXRlbSh0aGlzLlVTRVJTX1RBQkxFLCB1c2VyKTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFR5cGUodHlwZTogc3RyaW5nKTogQWNjb3VudFR5cGVzIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdnb2xkJykge1xuICAgICAgICAgICAgcmV0dXJuIEFjY291bnRUeXBlcy5HT0xEO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdibGFjaycpIHtcbiAgICAgICAgICAgIHJldHVybiBBY2NvdW50VHlwZXMuQkxBQ0s7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3BsYXRpbnVtJykge1xuICAgICAgICAgICAgcmV0dXJuIEFjY291bnRUeXBlcy5QTEFUSU5VTTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQWNjb3VudFR5cGVzLkJBU0lDO1xuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUlBO0FBSEE7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app/services/users/UserRepository.ts\n");

/***/ }),

/***/ "./src/domain/enum/types.ts":
/*!**********************************!*
  !*** ./src/domain/enum/types.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AccountTypes\": () => /* binding */ AccountTypes\n/* harmony export */ });\nvar AccountTypes;\n(function (AccountTypes) {\n    AccountTypes[\"BASIC\"] = \"basic\";\n    AccountTypes[\"GOLD\"] = \"gold\";\n    AccountTypes[\"PLATINUM\"] = \"platinum\";\n    AccountTypes[\"BLACK\"] = \"black\";\n})(AccountTypes || (AccountTypes = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZG9tYWluL2VudW0vdHlwZXMudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1leHByZXNzLWFwcGxpY2F0aW9uLy4vc3JjL2RvbWFpbi9lbnVtL3R5cGVzLnRzPzc5YWMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVudW0gQWNjb3VudFR5cGVzIHtcbiAgICBCQVNJQyA9ICdiYXNpYycsXG4gICAgR09MRCA9ICdnb2xkJyxcbiAgICBQTEFUSU5VTSA9ICdwbGF0aW51bScsXG4gICAgQkxBQ0sgPSAnYmxhY2snXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/domain/enum/types.ts\n");

/***/ }),

/***/ "./src/infra/database/DynamoDB.ts":
/*!****************************************!*
  !*** ./src/infra/database/DynamoDB.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DynamoDbConnection\": () => /* binding */ DynamoDbConnection\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\nclass DynamoDbConnection {\n    constructor() {\n        if (process.env.IS_OFFLINE === 'true') {\n            this.dynamodb = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient({\n                region: 'localhost',\n                endpoint: 'http://localhost:8000',\n                apiVersion: '2012-08-10'\n            });\n        }\n        else {\n            this.dynamodb = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient({\n                apiVersion: '2012-08-10'\n            });\n        }\n    }\n    async insertItem(tableName, item) {\n        const params = {\n            TableName: tableName,\n            Item: item\n        };\n        const result = this.dynamodb.put(params).promise();\n        return result;\n    }\n    async getItems(tableName, fields) {\n        const params = {\n            TableName: tableName,\n            ProjectionExpression: fields,\n            ExpressionAttributeNames: { '#name': 'name', '#type': 'type' }\n        };\n        const result = await this.dynamodb.scan(params).promise();\n        return result;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5mcmEvZGF0YWJhc2UvRHluYW1vREIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1leHByZXNzLWFwcGxpY2F0aW9uLy4vc3JjL2luZnJhL2RhdGFiYXNlL0R5bmFtb0RCLnRzPzc4YzQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREIgfSBmcm9tICdhd3Mtc2RrJztcblxuZXhwb3J0IGNsYXNzIER5bmFtb0RiQ29ubmVjdGlvbiB7XG4gICAgcHJpdmF0ZSBkeW5hbW9kYjogRHluYW1vREIuRG9jdW1lbnRDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52LklTX09GRkxJTkUgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgdGhpcy5keW5hbW9kYiA9IG5ldyBEeW5hbW9EQi5Eb2N1bWVudENsaWVudCh7XG4gICAgICAgICAgICAgICAgcmVnaW9uOiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXG4gICAgICAgICAgICAgICAgYXBpVmVyc2lvbjogJzIwMTItMDgtMTAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHluYW1vZGIgPSBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoe1xuICAgICAgICAgICAgICAgIGFwaVZlcnNpb246ICcyMDEyLTA4LTEwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaW5zZXJ0SXRlbSh0YWJsZU5hbWU6IHN0cmluZywgaXRlbTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zOiBEeW5hbW9EQi5Eb2N1bWVudENsaWVudC5QdXRJdGVtSW5wdXQgPSB7XG4gICAgICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgICAgICAgICAgIEl0ZW06IGl0ZW1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5keW5hbW9kYi5wdXQocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldEl0ZW1zKHRhYmxlTmFtZTogc3RyaW5nLCBmaWVsZHM6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtczogRHluYW1vREIuRG9jdW1lbnRDbGllbnQuU2NhbklucHV0ID0ge1xuICAgICAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICBQcm9qZWN0aW9uRXhwcmVzc2lvbjogZmllbGRzLFxuICAgICAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7ICcjbmFtZSc6ICduYW1lJywgJyN0eXBlJzogJ3R5cGUnIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5keW5hbW9kYi5zY2FuKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/infra/database/DynamoDB.ts\n");

/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*
  !*** ./src/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_services_users_UserRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/services/users/UserRepository */ \"./src/app/services/users/UserRepository.ts\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.get('/hello', (request, response) => {\n    response.json({\n        status: 'success',\n        data: 'Hello World!!'\n    });\n});\nrouter.post('/users', (request, response) => {\n    const { type, name, birthday } = request.body;\n    if (typeof type !== 'string') {\n        response.status(400).json({ error: '\"type\" must be a string' });\n    }\n    else if (typeof name !== 'string') {\n        response.status(400).json({ error: '\"name\" must be a string' });\n    }\n    const userRepository = new _app_services_users_UserRepository__WEBPACK_IMPORTED_MODULE_1__.UserRepository();\n    const promise = userRepository.createUser(name, type, birthday);\n    promise\n        .then((data) => {\n        response.status(200).json(data);\n    })\n        .catch((err) => {\n        console.error(err);\n    });\n});\nrouter.get('/users', (request, response) => {\n    const userRepository = new _app_services_users_UserRepository__WEBPACK_IMPORTED_MODULE_1__.UserRepository();\n    const promise = userRepository.getUsers();\n    promise\n        .then((data) => {\n        const users = [];\n        data.Items.forEach((element) => {\n            const user = {\n                userId: element.userId,\n                name: element.name,\n                type: element.type,\n                birthday: element.birthday\n            };\n            users.push(user);\n        });\n        response.status(200).json(users);\n    })\n        .catch((err) => {\n        console.error(err);\n    });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktZXhwcmVzcy1hcHBsaWNhdGlvbi8uL3NyYy9yb3V0ZXMudHM/ODBiMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvcm91dGVzLnRzXG5cbmltcG9ydCBleHByZXNzLCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCB7IFVzZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi9hcHAvc2VydmljZXMvdXNlcnMvVXNlclJlcG9zaXRvcnknO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9kb21haW4vZW50aXRpZXMvdXNlcnMnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvaGVsbG8nLCAocmVxdWVzdDogUmVxdWVzdCwgcmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzcG9uc2UuanNvbih7XG4gICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICBkYXRhOiAnSGVsbG8gV29ybGQhISdcbiAgICB9KTtcbn0pO1xuXG5yb3V0ZXIucG9zdCgnL3VzZXJzJywgKHJlcXVlc3Q6IFJlcXVlc3QsIHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSwgbmFtZSwgYmlydGhkYXkgfSA9IHJlcXVlc3QuYm9keTtcbiAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1widHlwZVwiIG11c3QgYmUgYSBzdHJpbmcnIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ1wibmFtZVwiIG11c3QgYmUgYSBzdHJpbmcnIH0pO1xuICAgIH1cbiAgICBjb25zdCB1c2VyUmVwb3NpdG9yeTogVXNlclJlcG9zaXRvcnkgPSBuZXcgVXNlclJlcG9zaXRvcnkoKTtcblxuICAgIGNvbnN0IHByb21pc2U6IFByb21pc2U8YW55PiA9IHVzZXJSZXBvc2l0b3J5LmNyZWF0ZVVzZXIoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGJpcnRoZGF5XG4gICAgKTtcblxuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cygyMDApLmpzb24oZGF0YSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG59KTtcblxucm91dGVyLmdldCgnL3VzZXJzJywgKHJlcXVlc3Q6IFJlcXVlc3QsIHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHVzZXJSZXBvc2l0b3J5OiBVc2VyUmVwb3NpdG9yeSA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xuICAgIGNvbnN0IHByb21pc2UgPSB1c2VyUmVwb3NpdG9yeS5nZXRVc2VycygpO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJzOiBVc2VyW10gPSBbXTtcbiAgICAgICAgICAgIGRhdGEuSXRlbXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXI6IFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogZWxlbWVudC51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGVsZW1lbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZWxlbWVudC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBiaXJ0aGRheTogZWxlbWVudC5iaXJ0aGRheVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdXNlcnMucHVzaCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzKDIwMCkuanNvbih1c2Vycyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7QUFFQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes.ts\n");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handler\": () => /* binding */ handler\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serverless-http */ \"serverless-http\");\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst handler = serverless_http__WEBPACK_IMPORTED_MODULE_1__(_app__WEBPACK_IMPORTED_MODULE_0__.default);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktZXhwcmVzcy1hcHBsaWNhdGlvbi8uL3NyYy9zZXJ2ZXIudHM/OTZiYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwIGZyb20gJy4vYXBwJztcblxuaW1wb3J0ICogYXMgc2VydmVybGVzcyBmcm9tICdzZXJ2ZXJsZXNzLWh0dHAnO1xuLy8gaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5SGFuZGxlciB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IHNlcnZlcmxlc3MoYXBwKTtcblxuLy8gbW9kdWxlLmV4cG9ydHMuaGFuZGxlciA9IHNlcnZlcmxlc3MoYXBwKTtcbi8vIGNvbnN0IFBPUlQgPSAzMDAwO1xuXG4vLyBhcHAubGlzdGVuKFBPUlQsICgpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhgRXhwcmVzcyBzZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgJHtQT1JUfWApO1xuLy8gfSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUVBO0FBR0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server.ts\n");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "body-parser":
/*!******************************!*
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");;

/***/ }),

/***/ "express":
/*!**************************!*
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "serverless-http":
/*!**********************************!*
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");;

/***/ }),

/***/ "uuid":
/*!***********************!*
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/server.ts");
/******/ })()

));