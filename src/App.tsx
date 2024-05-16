import { useLocalStorageState, useRequest, useTitle } from "ahooks"
import Search from "./Search"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import InfoCard from "./InfoCard";
interface userInfoData {
  studentKey: string,
  studentName: string,
  image: string,
}
function App() {
  useTitle("JHC INFO SEARCH")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pwd, setPwd] = useLocalStorageState<string | undefined>(
    "jhinfo-pwd", { defaultValue: 'test', }
  )
  const [name, setName] = useState<string>();
  const [data, setData] = useState<Array<userInfoData>>([]);
  setInterval(() => {
    setName(localStorage.getItem('jhinfo-name') || '')
  }, 500)
  const URL_INFO = 'https://jhc-api.vercel.app/info/{name}/{key}'
  const getData = (name: string) => {
    const url = URL_INFO.replace('{name}', name).replace('{key}', pwd || '')
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res == "200") {
          onOpen()
        } else {
          setData(res.data)
        }
      })
  }
  const { loading, run } = useRequest(getData, {
    manual: true,
  })
  return (
    <>
      <h1 className="underline font-bold text-2xl text-center mt-4" onClick={() => {
        if (!loading) {
          run(name as string)
        }
      }}>Hello JHCER</h1>
      <Search></Search>
      <div className="flex flex-col items-center">
        {data.map((item) => {
          return (
            <InfoCard Skey={item.studentKey} key={item.studentKey} name={item.studentName} img={item.image}></InfoCard>
          )
        })}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">请输入密码</ModalHeader>
              <ModalBody>
                <Input type="text" label="密码" onChange={(event) => { setPwd(event.target.value) }} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
