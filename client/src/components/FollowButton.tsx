import { Button } from "react-native-paper";
import { Dog } from "../api/types";
import { useFollow, useUnfollow } from "../state/queries";
import { COLORS } from "../constants";

export default function FollowButton({ isFollowing, setIsFollowing, dog }) {
  const followMutation = useFollow();
  const unfollowMutation = useUnfollow();
  const buttonName = isFollowing ? "Unfollow" : "Follow";
  const onPress = () => {
    if (buttonName == "Follow") {
      followMutation.mutateAsync(dog.id);
      setIsFollowing(true);
    } else {
      unfollowMutation.mutateAsync(dog.id);
      setIsFollowing(false);
    }
  };
  return (
    <Button
      className="width-25 absolute right-5"
      mode="contained"
      onPress={onPress}
      loading={followMutation.isLoading || unfollowMutation.isLoading}
      style={{ backgroundColor: COLORS.primary,width:110}}
    >
      {buttonName}
    </Button>
  );
}
