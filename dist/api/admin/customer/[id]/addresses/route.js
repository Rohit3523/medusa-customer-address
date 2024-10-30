"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const medusa_1 = require("@medusajs/medusa");
async function GET(req, res) {
    const customer_id = req.params.id;
    const customerService = req.scope.resolve("customerService");
    const address = await customerService
        .retrieve(customer_id, {
        relations: ['shipping_addresses']
    });
    res.status(200).json(address.shipping_addresses);
}
exports.GET = GET;
async function POST(req, res) {
    const customer_id = req.params.id;
    const customerService = req.scope.resolve("customerService");
    const manager = req.scope.resolve("manager");
    const validated = await (0, medusa_1.validator)(medusa_1.AddressCreatePayload, req.body);
    const address = await customerService.addAddress(customer_id, validated);
    res.status(200).json(address);
}
exports.POST = POST;
