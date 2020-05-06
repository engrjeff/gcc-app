import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../state/actions/profileActions";

import ProfileView from "./ProfileView";
import EmptyPageWithButton from "../layout/EmptyPageWithButton";

const Profile = ({ getProfile, profile, loading, user, history }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const goToProfileForm = () => {
    history.push("/me/profile/create");
  };
  return (
    <Fragment>
      {loading ? null : !profile || (profile && !profile.data) ? (
        <EmptyPageWithButton
          buttonLabel="Create Profile"
          onClick={goToProfileForm}
        />
      ) : (
        <ProfileView profile={{ ...profile.data, user }} />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    loading: state.profile.loading,
    user: state.auth.user.data,
  };
};
const mapDispatchToProps = {
  getProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
