import grpc from '@grpc/grpc-js'
import protoloader from "@grpc/proto-loader";

const packageDefinition = protoloader.loadSync(
    "./proto/helloworld.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

function sayMyName(call, callback) {
    const option = call.request.option ?? -1
    let response;
    switch (option) {
        case 1:
            response = "Hyperelectrosenstivity"
            break;
        case 2:
            response = "One after magna carta"
            break;
        case 3:
            response = "Youre goddamn right"
            break;
        case 4:
            response = "Lightning bolt shoots through my fingertips"
            break;
        case -1:
            throw new Error("Something went wrong")
        default:
            response = "OutOfRange"
            break;
    }


    callback(null, { message: response })
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.BreakBad.service, { sayMyName: sayMyName })
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });


    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main()