import { ReactElement } from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import CustomButton from "./CustomButton";
import { ExclamationCircleIcon } from "react-native-heroicons/solid";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  modalStyles: string;
  action: ReactElement;
}

const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  content,
  modalStyles,
  action,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={tw`${"flex-1 items-center justify-center bg-black/70"}`}>
        <View style={tw`${modalStyles}`}>
          {/* header */}
          <Image
            source={require("../assets/images/food.png")}
            style={tw`${"h-15 w-15"}`}
          />
          <View style={tw`${"flex-row justify-between items-center gap-3"}`}>
            <Text style={tw`${"text-2xl font-bold"}`}>{title}</Text>
            {/* <ExclamationCircleIcon style={tw`text-amber-500`} size={40} /> */}
          </View>
          <Text style={tw`${"my-5 mb-8"}`}>{content}</Text>
          <View style={tw`${"flex-row gap-6"}`}>
            <CustomButton
              text="cancel"
              backgroundStyles="bg-black/10 p-2 px-4 rounded-lg"
              textStyles="text-black font-semibold"
              onPress={onClose}
            />
            {action}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
