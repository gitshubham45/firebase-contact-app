import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclosure from "../hooks/useDisclosure";
import { toast } from "react-toastify";


const ContactCard = ({ contact }) => {

    const {isOpen,onClose,onOpen} = useDisclosure();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db,"contacts",id));
            toast.success("Contact deleted successfully");
        } catch (error) {
            console.error(error);
        }
    }

    console.log(contact);

    return (
        <>
            <div
                key={contact.id}
                className="flex items-center justify-between rounded-lg bg-yellow p-2"
            >
                <div className="flex gap-1">
                    <HiOutlineUserCircle className="text-4xl text-orange" />
                    <div className="">
                        <h2 className="font-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex text-3xl">
                    <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
                    <IoMdTrash
                        onClick={()=>deleteContact(contact.id)}
                        className="cursor-pointer text-orange"
                    />
                </div>
            </div>
            <AddAndUpdateContact
                contact={contact}
                isUpdate
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}

export default ContactCard;
