"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
        f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

    function verb(n) { return function(v) { return step([n, v]); }; }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return { value: op[1], done: false };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
                        t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2];
                        _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e];
            y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductosAgregarPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProductosAgregarPage = /** @class */ (function() {
    function ProductosAgregarPage(formBuilder, loadingController, restApi, router, alertController) {
        this.formBuilder = formBuilder;
        this.loadingController = loadingController;
        this.restApi = restApi;
        this.router = router;
        this.alertController = alertController;
        this.producto = {
            producto_id: 0,
            nombre: '',
            precio: '',
            stock: '',
            descripcion: '',
            imagen: '',
            categoria: NaN,
            subcategoria: NaN
        };
    }
    ProductosAgregarPage.prototype.ngOnInit = function() {
        this.productosForm = this.formBuilder.group({
            "pro_nom": [this.producto.nombre, Validators.required],
            'pro_precio': [this.producto.precio, Validators.required],
            'pro_stock': [this.producto.stock, Validators.required],
            'pro_desc': [this.producto.descripcion, Validators.required],
            'pro_img': [null, Validators.compose([Validators.required, Validators.required])],
            'pro_cate': [this.producto.categoria, Validators.required],
            'pro_subcate': [this.producto.subcategoria, Validators.required],
          });
    };
    ProductosAgregarPage.prototype.onFormSubmit = function(form) {
        return __awaiter(this, void 0, void 0, function() {
            var confirmAlert;
            var _this = this;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/ , this.alertController.create({
                            header: 'Confirmación',
                            message: '¿Desea confirmar los datos?',
                            buttons: [{
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function() {
                                        console.log('Cancelado');
                                    }
                                },
                                {
                                    text: 'Confirmar',
                                    handler: function() {
                                        _this.guardarDatos();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        confirmAlert = _a.sent();
                        return [4 /*yield*/ , confirmAlert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/ ];
                }
            });
        });
    };
    ProductosAgregarPage.prototype.guardarDatos = function() {
        return __awaiter(this, void 0, void 0, function() {
            var loading;
            var _this = this;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/ , this.loadingController.create({
                            message: 'Loading...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/ , loading.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/ , this.restApi.addProductos(this.productos)
                            .subscribe({
                                next: function(res) {
                                    return __awaiter(_this, void 0, void 0, function() {
                                        var alert;
                                        var _this = this;
                                        return __generator(this, function(_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log("Next AddProductos Page", res);
                                                    loading.dismiss();
                                                    if (res == null) {
                                                        console.log("No Agregó");
                                                        return [2 /*return*/ ];
                                                    }
                                                    return [4 /*yield*/ , this.alertController.create({
                                                        header: 'Muchas gracias',
                                                        message: 'Tus datos se han guardado.',
                                                        buttons: ['OK']
                                                    })];
                                                case 1:
                                                    alert = _a.sent();
                                                    return [4 /*yield*/ , alert.present()];
                                                case 2:
                                                    _a.sent();
                                                    // Redirigimos después de cerrar el mensaje
                                                    setTimeout(function() {
                                                        _this.router.navigate(['/productos-home']);
                                                    }, 1000);
                                                    return [2 /*return*/ ];
                                            }
                                        });
                                    });
                                },
                                complete: function() {},
                                error: function(err) {
                                    console.log("Error AddProductos Página", err);
                                    loading.dismiss();
                                }
                            })
                        ];
                    case 3:
                        _a.sent();
                        return [2 /*return*/ ];
                }
            });
        });
    };
    ProductosAgregarPage = __decorate([
        core_1.Component({
            selector: 'app-productos-agregar',
            templateUrl: './productos-agregar.page.html',
            styleUrls: ['./productos-agregar.page.scss']
        })
    ], ProductosAgregarPage);
    return ProductosAgregarPage;
}());
exports.ProductosAgregarPage = ProductosAgregarPage;