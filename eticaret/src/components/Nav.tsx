import Dropdown from "./Dropdown";

const Nav = () => {
    return(
        <div className="flex justify-center items-center my-6 mx-10 bg-blue-300 h-8 ">
            <div className="w-1/6 mx-6">
                <Dropdown buttonLabel="Bilgisayar & Tablet">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Masaüstü Bilgisayar</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dizüstü Bilgisayar</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Monitör</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bilgisayar Kasası</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Tablet</a>
                </Dropdown>
            </div>
            <div className="w-1/6 mx-6">
                <Dropdown buttonLabel="Donanım Ürünleri">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Ekran Kartı</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">RAM</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">SSD</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Power (Güç Kaynağı)</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Ses Kartı</a>
                </Dropdown>
            </div>
            <div className="w-1/6 mx-6">
                <Dropdown buttonLabel="Aksesuarlar">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Klavye</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mouse (Fare)</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Hoparlör</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Kulaklık</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mikrofon</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yazıcı & Tarayıcı</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Web Kamera</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Modem</a>
                </Dropdown>
            </div>
            <div className="w-1/6 mx-6">
                <a href="https://yirmibes.com.tr/?gad_source=1" className="block px-4 py-2 hover:text-white">Yazılım Çözümleri</a>
                
            </div>
            
        </div>
    )
}

export default Nav