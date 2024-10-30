"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.GET = void 0;
async function GET(req, res) {
    const customer_id = req.params.id;
    const address_id = req.params.addressid;
    const customerService = req.scope.resolve("customerService");
    const customer = await customerService
        .retrieve(customer_id, {
        relations: ['shipping_addresses']
    });
    const address = customer.shipping_addresses.find(address => address.id === address_id);
    res.status(200).json(address);
}
exports.GET = GET;
async function DELETE(req, res) {
    const customer_id = req.params.id;
    const address_id = req.params.addressid;
    const customerService = req.scope.resolve("customerService");
    const manager = req.scope.resolve("manager");
    await customerService.removeAddress(customer_id, address_id);
    const address = await customerService
        .retrieve(customer_id, {
        relations: ['shipping_addresses']
    });
    res.status(200).json(address.shipping_addresses);
}
exports.DELETE = DELETE;
