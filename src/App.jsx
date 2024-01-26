import Navbar from "./components/Navbar"
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
// import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclosure from "./hooks/useDisclosure";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {

  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }).sort((a, b) => (a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1));
          setContacts(contactList);
          return contactList;
        })
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
    console.log(import.meta.env.VITE_API_KEY);

  }, []);


  const filterContacts = (e) => {

    const value = e.target.value;

    console.log(value);

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }).sort((a, b) => (a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1));

      const filteredContacts = contactList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));
      setContacts(filteredContacts);
      return filteredContacts;
    })
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex flex-col gap-2 ">
          <div className="relative flex flex-grow items-center overflow-hidden">
            <FiSearch
             className="absolute ml-1 text-3xl text-white" 
             />
            <input type="text"
               onChange={filterContacts} 
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
            <AiFillPlusCircle
              onClick={onOpen}
              className="cursor-pointer text-5xl text-white"
            />
          </div>

          <div className="mt-4 h-80 flex flex-col gap-3 overflow-y-auto">
            {contacts.length <=0 ?(<NotFoundContact />)
            :contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>

      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer
        position="bottom-center"
      />
    </>
  )
}

export default App
