const app = require("../../startup/app");
const request = require('supertest');
const JWTWrapper = require("../../utils/JwtWrapper");
const BidRepository = require("../../repositories/BidRepository");
const ProductRepository = require("../../repositories/ProductRepository");
const expect = require("../utils/expect_utils");
let productRepo;
let bidRepo;
let token;
beforeEach(() => {

    bidRepo = new BidRepository();
    productRepo = new ProductRepository();
    let payload = {
        id: 4
    };
    let jwt_obj = new JWTWrapper(payload);
    token = jwt_obj.generateToken();
});

afterEach(async() => {
    await productRepo.remove();
    await bidRepo.remove();
});

describe("bids routes testing", () => {


    it("validates whether authorised to save bid or not", async() => {

        let product = await save_product();
        let bid = {
            "user_id": 3,
            "product_id": product.id,
            "price": 34
        };
        const res = await request(app)
            .post("/api/bids")
            .send(bid)
            .set({ "Authorization": `Bearer ${token}` });
        console.log(res.status);
        expect(res.status).toEqual(200);
    });

    it("save the bid with regards to the product", async() => {
        let product = await save_product();
        let bid = {
            "user_id": 3,
            "product_id": product.id,
            "price": 34
        };
        const res = await request(app)
            .post("/api/bids")
            .send(bid)
            .set({ "Authorization": `Bearer ${token}` });
        console.log(res.body);
        expect(res.body.bids.length).toBe(1);
    });

    it("finalizes a bid from list of bids", async() => {
        let product = await save_product();
        let bids = mock_bids(product.id);
        //console.log(bids);
        let bid = await getBid(bids);
        // console.log(bid);
        let bidId = bid[0].id;
        // console.log(bid);
        let bid_modified = await request(app)
            .put(`/api/bids/${product.id}/${bidId}`)
            .set({ "Authorization": `Bearer ${token}` });
        expect(bid_modified.body.bids).toContainObject({ is_finalized: true });
        expect(bid_modified.body.bids.length).toBe(1);
        //console.log(bid_modified.body);

    });

    it("deletes a bid from list of bids", async() => {
        let product = await save_product();
        let bids = mock_bids(product.id);
        let bid = await getBid(bids);
        let bidId = bid[0].id;
        let bid_del_response = await request(app)
            .delete(`/api/bids/${product.id}/${bidId}`)
            .set({ "Authorization": `Bearer ${token}` });
        expect(bid_del_response.body.bids.length).toBe(bids.length - 1);
        expect(bid_del_response.body.bids).not.toContainObject({ price: 46 });
    });

    async function getBid(bids) {
        let bids_saved = await bidRepo.bulkSave(bids);
        // console.log("getBifssd ::::: ");
        // console.log(bids_saved);
        let bid = bids_saved.filter(bid => {
            if (bid.price == 46) {
                return bid;
            }
        });

        return bid;
    }

    function mock_bids(productId) {
        let bids = [{
                "user_id": 3,
                "product_id": productId,
                "price": 34
            },
            {
                "user_id": 3,
                "product_id": productId,
                "price": 46
            },
            {
                "user_id": 3,
                "product_id": productId,
                "price": 57
            }
        ];

        return bids;
    }




    async function save_product() {
        let product = {
            "name": "Prod15"
        };
        const res = await request(app)
            .post("/api/products")
            .send(product)
            .set({ "Authorization": `Bearer ${token}` });

        return res.body.products[0];
    }
});