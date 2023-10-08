import grpc from '@grpc/grpc-js'
import protoloader from "@grpc/proto-loader";
import { argv } from "process";


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

function client1() {
    const breakBadService = new hello_proto.BreakBad('localhost:50051', grpc.credentials.createInsecure());
    const option = parseInt(argv[2])
    breakBadService.sayMyName({ option: option }, (err, res) => {
        console.log(res?.message);
    })
}


function client2() {
    const breakBadService = new hello_proto.BreakBad('localhost:50051', grpc.credentials.createInsecure());
    breakBadService.sayMyName({ option: 1 }, (err, res) => {
        console.log(res?.message);
    })
}

function client3() {
    const helloService = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
    helloService.sayHello({ name: 'john' }, (err, res) => {
        console.log(res?.message);
    })
}

// async function main() {
//     const a = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(client2())
//         }, 3000)
//     })
//     client1()
// }

// main()
client1()
client2()
client3()
client1()
client2()
client3()