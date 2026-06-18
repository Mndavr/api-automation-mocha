import fetch from "node-fetch"
import { expect } from "chai";
import Ajv from "ajv";
import schema_user from "../schema/reqresSchema.js";

describe("API Test Reqres", function(){

    it("Get single user", async function(){
        
        const hasil = await fetch('https://reqres.in/api/users/3', {
            method: 'GET',
            headers: {
                'x-api-key': 'reqres_b75cc82840a3447b8c128b2aef40f20b',
                'Accept': 'application/json'
            }
        });

        expect(hasil.status).to.equal(200);

    });

    it("Create new User", async function(){
        const newPost = {
            name: "Mananda",
            job: "QA Junior"
        }

        const hasilpost = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                "x-api-key": "reqres_b75cc82840a3447b8c128b2aef40f20b",
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify(newPost)
        })

        expect(hasilpost.status).to.equal(201)

        const ajv = new Ajv()
        const data = await hasilpost.json();
        const cekcek = ajv.compile(schema_user)
        const hasil_validasi = cekcek(data)

        expect(hasil_validasi).to.be.true
    });

    it("Update User (PUT)", async function(){
        const updatedPost = {
            name: "Mananda Updated",
            job: "QA Senior"
        };

        const hasilput = await fetch('https://reqres.in/api/users/3', {
            method: 'PUT',
            headers: {
                "x-api-key": "reqres_b75cc82840a3447b8c128b2aef40f20b",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        });

        // Memastikan status code adalah 200 OK
        expect(hasilput.status).to.equal(200);

        const ajv = new Ajv();
        const data = await hasilput.json();
        const cekcek = ajv.compile(schema_user);
        const hasil_validasi = cekcek(data);

        if (!hasil_validasi) {
            console.log('Schema Validation Errors:', cekcek.errors);
        }

        expect(hasil_validasi).to.be.true;
    });

    it("Delete User (DELETE)", async function(){
        const hasildelete = await fetch('https://reqres.in/api/users/3', {
            method: 'DELETE',
            headers: {
                "x-api-key": "reqres_b75cc82840a3447b8c128b2aef40f20b"
            }
        });

        
        expect(hasildelete.status).to.equal(204);
        

        // Tidak ada validasi JSON Schema karena response body sudah kosong.
    });

})