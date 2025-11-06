function Footer() {
    const data = new Date().getFullYear();
    return (
        <div className="w-full text-white flex justify-center py-4 border-t border-white">
            <div className="container flex flex-col items-center p-1">
                <p className="text-sm font-bold">
                    Conduzzé | Copyright: {data}
                </p>

                <p className="text-xs">
                    &copy; Todos os direitos reservados a UNMUTED{" "}
                </p>
            </div>
        </div>
    );
}
export default Footer;