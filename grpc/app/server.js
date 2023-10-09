import grpc from '@grpc/grpc-js'
import protoloader from "@grpc/proto-loader";
import { createPlaceService, deletePlaceService, getAllPlacesService, getPlaceService, updatePlaceService } from "./service/places.js";

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

const hello_proto = grpc.loadPackageDefinition(helloWorldPackage).helloworld
const place = grpc.loadPackageDefinition(placesPackageDefn).places

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
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

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main()