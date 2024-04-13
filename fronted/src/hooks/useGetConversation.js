import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                const conversationsArray = data.filteredUser || [];

                setConversation(conversationsArray);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversation();
    }, []);

    return { loading, conversation };
};

export default useGetConversation;
