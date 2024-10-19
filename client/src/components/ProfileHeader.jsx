import React, { useState } from "react";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileHeader = ({
  user1,
  onImageUpload,
  onInputChange,
  onProfileUpdate,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleEditToggleName = () => {
    setIsEditingName(!isEditingName);
  };

  const handleEditToggleBio = () => {
    setIsEditingBio(!isEditingBio);
  };

  const handleImageUpload = (event) => {
    onImageUpload(event);
    onProfileUpdate();
  };

  return (
    <div className="flex md:flex-row flex-col space-y-3 items-stretch ">
      <div className="flex-1 flex flex-col justify-around items-center space-y-3 w-full ">
        <img
          src={user1.profilePicture}
          alt={`${user1.name}'s profile`}
          className="w-32 h-32 rounded-full"
        />
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageUpload} // Use the new handler
          className="cursor-pointer text-center"
        />
      </div>
      <div className="w-full">
        <div className="">
          <label className="block font-semibold my-2">
            Username{" "}
            {isEditingName ? (
              <FontAwesomeIcon
                onClick={() => {
                  handleEditToggleName();
                  onProfileUpdate(); // Call the profile update function on save
                }}
                icon={faSave}
                className="cursor-pointer ml-2"
              />
            ) : (
              <FontAwesomeIcon
                onClick={handleEditToggleName}
                icon={faEdit}
                className="cursor-pointer ml-2"
              />
            )}
          </label>

          <input
            type="text"
            name="name"
            value={user1.name}
            onChange={onInputChange}
            className={`p-2 w-full mb-4 ${
              isEditingName ? "" : "bg-gray-200 cursor-not-allowed"
            }`}
            disabled={!isEditingName}
          />
        </div>
        <div className="">
          <label className="block font-semibold my-2">
            Bio{" "}
            {isEditingBio ? (
              <FontAwesomeIcon
                onClick={() => {
                  handleEditToggleBio();
                  onProfileUpdate(); // Call the profile update function on save
                }}
                icon={faSave}
                className="cursor-pointer ml-2"
              />
            ) : (
              <FontAwesomeIcon
                onClick={handleEditToggleBio}
                icon={faEdit}
                className="cursor-pointer ml-2"
              />
            )}
          </label>
          <textarea
            name="bio"
            value={user1.bio}
            onChange={onInputChange}
            style={{ resize: "none" }}
            className={`p-2 w-full mb-4 ${
              isEditingBio ? "" : "bg-gray-200 cursor-not-allowed"
            }`}
            rows="3"
            disabled={!isEditingBio}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
