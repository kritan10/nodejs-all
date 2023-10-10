import grpc from '@grpc/grpc-js'
import protoloader from "@grpc/proto-loader";
import { createPlaceService, deletePlaceService, getAllPlacesService, getPlaceService, updatePlaceService } from "./service/places.js";
import { loginService } from './service/auth.js';
import jwt from "jsonwebtoken";

const helloWorldPackage = protoloader.loadSync(
    "app/proto/helloworld.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

const placesPackageDefn = protoloader.loadSync(
    "app/proto/places.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

const authPackageDefn = protoloader.loadSync(
    "app/proto/auth.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

const hello_proto = grpc.loadPackageDefinition(helloWorldPackage).helloworld
const place = grpc.loadPackageDefinition(placesPackageDefn).places
const auth = grpc.loadPackageDefinition(authPackageDefn).auth

function sayHello(call, callback) {
    const token = call.metadata.internalRepr.get('authorization')[0]
    const response = { message: '' }
    try {
        const user = jwt.verify(token.split(' ')[1], 'mysecretkey')
        response.message = JSON.stringify({
            message: 'login success',
            id: user.id,
            secret: user.message
        })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError)
            response.message = error.message
    }
    console.log("\nTOKEN: " + token);
    callback(null, response);
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
    server.addService(place.PlaceService.service, {
        GetAllPlaces: getAllPlacesService,
        GetPlace: getPlaceService,
        CreatePlace: createPlaceService,
        UpdatePlace: updatePlaceService,
        DeletePlace: deletePlaceService,
    })
    server.addService(auth.AuthService.service, {
        Login: loginService,
    })

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main()