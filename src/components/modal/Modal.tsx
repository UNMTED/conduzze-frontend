import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface ModalProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    textoBtn: string;
}

export default function Modal({ children, trigger }: ModalProps) {
    return (
        <Popup
            trigger={trigger}
            modal
            position="top center"
            contentStyle={{
                borderRadius: "1rem",
                padding: "0",
                marginTop: "10rem",
            }}
        >
            {
                ((close: any) => (
                    <div className="relative rounded-2xl bg-linear-to-bl from-conduzze-dark via-conduzze-dark to-conduzze-light p-6">
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Fechar"
                            className="absolute top-2 right-4 text-gray-300 hover:text-white text-3xl"
                        >
                            ×
                        </button>
                        {children}
                    </div>
                )) as any
            }
        </Popup>
    );
}
