const app = require("../../startup/app");
const request = require('supertest');
const ProductRepository = require("../../repositories/ProductRepository");
const JWTWrapper = require("../../utils/JwtWrapper");
const expect = require("../utils/expect_utils");

let productRepo;
let token = "";
beforeEach(() => {

    productRepo = new ProductRepository();
    let payload = {
        id: 4
    };
    let jwt_obj = new JWTWrapper(payload);
    token = jwt_obj.generateToken();


});
afterEach(async() => {
    //console.log("aftereach done");
    await productRepo.remove();
});

describe("products routes testing", () => {

    it("validates whether authorised to save product or not", async() => {

        let product = {
            "name": "Prod15"
        };
        const res = await request(app)
            .post("/api/products")
            .send(product)
            .set({ "Authorization": `Bearer ${token}` });
        console.log(res.status);
        expect(res.status).toEqual(200);
        // } finally {
        //     await productRepo.remove();
        // }

    });

    it("saves product in the list", async() => {

        let product = {
            "name": "Prod15"
        };
        const res = await request(app)
            .post("/api/products")
            .send(product)
            .set({ "Authorization": `Bearer ${token}` });
        console.log(res.body.products.length);
        expect(res.body.products.length).toEqual(1);

    });

    it("deletes product from the list", async() => {
        let prod_objs = [{
                name: "antique"
            },
            {
                name: "peacock"
            },
            {
                name: "sandal"
            }
        ];
        // await prod_objs.map(async(product) => {
        //     await productRepo.save(product);
        // });
        await productRepo.bulkSave(prod_objs);
        const prod_response = await request(app)
            .get("/api/products");

        //console.log(prod_response.body);
        let prods = prod_response.body.products;
        let prod_filtered = prods.filter(product => {
            if (product.name == "peacock") {
                return product;
            }
        });
        let del_res = await request(app)
            .delete(`/api/products/${prod_filtered[0].id}`)
            .set({ "Authorization": `Bearer ${token}` });
        console.log("delete test done");
        console.log(del_res.body.products.length, prods.length);
        expect(del_res.body.products.length).toBe(prods.length - 1);
        expect(del_res.body.products).not.toContainObject({ "name": "peacock" });



    });
});