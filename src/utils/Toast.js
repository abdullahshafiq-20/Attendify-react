import { Slide, toast } from "react-toastify";

export const Toast = (message, type) => {
    switch (type) {
        case "success":
            return toast.success(message, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                style: {
                    backgroundColor: "#1E293B",
                  },
            });
        case "error":
            return toast.error(message, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                style: {
                    backgroundColor: "#1E293B",
                  },
            });
    }
};


