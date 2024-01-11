import { Card, CardHeader, CardBody, Image, Spacer } from "@nextui-org/react";
const InfoCard = (props: { name: string, Skey: string, img: string }) => {
    return (<>
        <Card className="py-4 mb-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h1 className="text-xl uppercase font-bold underline">{props.name}</h1>
                <h1 className="text-large uppercase font-serif">{props.Skey}</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={"https://api.jhc.cn/api/ImageBase/MemPhoto/"+props.img}
                    width={270}
                />
            </CardBody>
            <Spacer y={4}></Spacer>
        </Card>
    </>);
}

export default InfoCard;