import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();
  console.log("coversations",conversation);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {Array.isArray(conversation) &&
        conversation.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversation.length - 1}
          />
        ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
