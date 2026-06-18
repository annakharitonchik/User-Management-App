import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
import { Lock, Trash2, LockOpen, UserRoundX } from "lucide-react";

const Table = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const getTimeAgo = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diff = Math.floor((now - loginDate) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (minutes < 1) return `less than a minute ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24)
      return `${hours} ${hours === 1 ? "hour ago" : "hours ago"} `;
    if (days < 7) return `${days} ${days === 1 ? "day ago" : "days ago"}`;
    return `${weeks} ${weeks === 1 ? "week ago" : "weeks ago"}`;
  };
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleUserActions = async ({
    url,
    newStatus,
    remove = false,
    logout = false,
    action,
  }) => {
    const selectedUsers = users.filter((u) => selectedEmails.includes(u.email));

    if (!selectedUsers.length) {
      showErrorMessage("Please select users");
      return;
    }
    switch (action) {
      case "Blocking": {
        const definedUsers = selectedUsers.filter(
          (u) => u.status === "Blocked",
        );
        if (definedUsers.length === 1) {
          showErrorMessage(`User is already blocked`);
          return;
        } else if (definedUsers.length > 1) {
          showErrorMessage(`Users are already blocked`);
          return;
        }
        break;
      }
      case "Unblocking": {
        const definedUsers = selectedUsers.filter(
          (u) => u.status !== "Blocked",
        );
        if (definedUsers.length === 1) {
          showErrorMessage(`User is already unblocked`);
          return;
        } else if (definedUsers.length > 1) {
          showErrorMessage(`Users are already unblocked`);
          return;
        }
        break;
      }
      case "Removing unverified users": {
        if (selectedUsers.some((u) => u.status !== "Unverified")) {
          showErrorMessage("Please select users with status 'Unverified'");
          return;
        }
        break;
      }
    }
    const emails = selectedUsers.map((u) => u.email);

    await axios.patch(
      apiUrl + url,
      { emails },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    if (logout && selectedUsers.some((u) => u.email === user.email)) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    setUsers((prev) =>
      remove
        ? prev.filter((u) => !emails.includes(u.email))
        : prev.map((u) =>
            emails.includes(u.email)
              ? {
                  ...u,
                  status: newStatus(u),
                  blocked_at:
                    newStatus(u) === "Blocked"
                      ? new Date().toISOString()
                      : null,
                }
              : u,
          ),
    );
    showSuccessMessage(`${action} successful`);
  };
  const blockSelectedUsers = () => {
    handleUserActions({
      url: "/api/auth/users/block",
      newStatus: () => "Blocked",
      logout: true,
      action: "Blocking",
    });
  };
  const unBlockSelectedUsers = () => {
    handleUserActions({
      url: "/api/auth/users/unblock",
      newStatus: (u) => (u.verified ? "Active" : "Unverified"),
      action: "Unblocking",
    });
  };
  const removeSelectedUsers = () => {
    handleUserActions({
      url: "/api/auth/users/remove",
      remove: true,
      logout: true,
      action: "Removing",
    });
  };
  const removeSelectedUnverifiedUsers = () => {
    handleUserActions({
      url: "/api/auth/users/remove/unverified",
      remove: true,
      logout: true,
      action: "Removing unverified users",
    });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/users", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUsers(res.data);
      } catch {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {(successMessage || errorMessage) && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 shadow-lg rounded-xl px-5 py-4 z-50 w-90 max-w-sm text-center text-white ${
            successMessage ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage ? successMessage : errorMessage}
          </p>
        </div>
      )}
      <div
        className="w-full h-full caret-transparent flex flex-col
    justify-center items-center gap-y-2"
      >
        <div className="w-full h-5/6 bg-white rounded-xl">
          <div className=" px-5 py-4 bg-gray-300 overflow-x-auto">
            <div className="h-10 flex gap-3 items-center justify-between min-w-max">
              <div className="h-full flex items-center gap-2">
                <button
                  className=" h-full border-2 flex items-center gap-1 border-blue-600 rounded-md px-2 py-1 text-blue-600"
                  onClick={blockSelectedUsers}
                >
                  <Lock size={20} />
                  <span className="font-semibold">Block</span>
                </button>

                <button
                  className=" h-full border-2 flex items-center justify-center border-blue-600 rounded-md aspect-square text-blue-600"
                  onClick={unBlockSelectedUsers}
                >
                  <LockOpen size={20} />
                </button>
                <button
                  className=" h-full border-2 flex items-center justify-center border-red-600 rounded-md aspect-square text-red-600"
                  onClick={removeSelectedUsers}
                >
                  <Trash2 size={20} />
                </button>
                <button
                  className=" h-full border-2 flex items-center justify-center border-red-600 rounded-md aspect-square text-red-600"
                  onClick={removeSelectedUnverifiedUsers}
                >
                  <UserRoundX size={20} />
                </button>
              </div>
              <div className="h-full w-70">
                <input
                  className="border h-full w-full border-gray-300 px-2 rounded bg-white"
                  type="text"
                  placeholder="Filter"
                />
              </div>
            </div>
          </div>
          <div className="p-5 w-full overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead className="border-b-2 border-gray-200">
                <tr className="">
                  <th className="text-start py-2 pr-2 w-1/9 ">
                    <input
                      type="checkbox"
                      checked={
                        users.length > 0 &&
                        users.every((user) =>
                          selectedEmails.includes(user.email),
                        )
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmails(users.map((user) => user.email));
                        } else {
                          setSelectedEmails([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-start py-2 pr-2 w-2/9 ">Name</th>
                  <th className="text-start py-2 pr-2 w-3/9">Email</th>
                  <th className="text-start py-2 pr-2 w-2/9">Status</th>
                  <th className="text-start py-2 pr-2 w-1/9">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {users.map((person, index) => (
                  <tr
                    className={
                      person.status === "Blocked"
                        ? "line-through text-gray-400 border-b-2 border-gray-200"
                        : "border-b-2 border-gray-200"
                    }
                    key={index}
                  >
                    <td className="py-3">
                      <div className="flex gap-2">
                        <div className="font-medium">
                          <input
                            type="checkbox"
                            checked={selectedEmails.includes(person.email)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedEmails((prev) => [
                                  ...prev,
                                  person.email,
                                ]);
                              } else {
                                setSelectedEmails((prev) =>
                                  prev.filter(
                                    (email) => email !== person.email,
                                  ),
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {person.name}
                      </div>
                    </td>
                    <td>
                      <div className="whitespace-nowrap">{person.email}</div>
                    </td>
                    <td className="whitespace-nowrap">{person.status}</td>
                    <td>
                      <div className="whitespace-nowrap relative group cursor-pointer z-10">
                        {person.status === "Blocked" && person.blocked_at
                          ? "Blocked at " +
                            new Date(person.blocked_at).toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : getTimeAgo(person.last_seen)}
                        <div
                          className="
      absolute left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      bg-gray-900 text-white text-xs rounded px-2 py-1"
                        >
                          {person.status === "Blocked"
                            ? new Date(person.blocked_at).toLocaleString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                },
                              )
                            : new Date(person.last_seen).toLocaleString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                },
                              )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
