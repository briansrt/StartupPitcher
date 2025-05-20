import {React, useState} from 'react';
import { SignIn, SignInButton } from '@clerk/clerk-react';
import { ArrowRight, Lightbulb, ThumbsUp, Rocket, MessageSquareMore, Lock } from 'lucide-react';

export default function PublicDashboard() {
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [chatAttempts, setChatAttempts] = useState(0);

    const mockIdeas = [
        { id: 1, title: "App para encontrar cuidadores de mascotas", description: "Conecta dueños de mascotas con cuidadores confiables.", valorated: 182 },
        { id: 2, title: "Marketplace de comida saludable local", description: "Compra comida saludable directamente a productores locales.", valorated: 256 },
        { id: 3, title: "Servicio de mentoría para estudiantes remotos", description: "Mentores verificados para estudiantes online.", valorated: 120 },
    ];

    const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setChatAttempts(chatAttempts + 1);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (chatAttempts >= 2) {
        botResponse = 'Parece que tienes una idea interesante. Regístrate gratis para continuar el análisis y recibir feedback completo.';
      } else if (chatAttempts === 1) {
        botResponse = '¿Cuál es el problema principal que tu idea resuelve? ¿Has identificado a tu público objetivo?';
      } else {
        botResponse = 'Interesante. ¿Has investigado si existen competidores similares en el mercado? ¿Cuál sería tu ventaja competitiva?';
      }
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

    return (
        <main>
            <section className='h-screen flex items-center justify-center gap-20 md:flex-row flex-col p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16'>
                <div className='container mx-auto px-4 flex items-center justify-center gap-20'>
                    <div className='max-w-2xl flex flex-col gap-5'>
                        <a href="https://twitch.tv/midudev" target="_blank" rel="noopener noreferrer" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 w-80 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block" style={{verticalAlign: "middle"}}><path d="M4 2L2 6V22H7V24H11L13 22H17L22 17V2H4Z" fill="#fff"></path><path d="M7 17V4H20V16L17 19H13L11 21V19H7Z" fill="#9147FF"></path><rect x="15" y="7" width="2" height="6" fill="#fff"></rect><rect x="11" y="7" width="2" height="6" fill="#fff"></rect></svg> <span>Hackaton Clerk con Midudev en Twitch</span> </a>
                        <h1 className='text-blue-400 text-5xl font-extrabold'>Valida tu idea de negocio</h1>
                        <p className='text-3xl font-extrabold'>y mejora tu pitch con IA.</p>
                        <p className='text-lg mb-8 text-indigo-100'>Transforma tus conceptos en propuestas convincentes. Obten feedback instantáneo y pule tu presentacion hasta la perfección</p>
                        <button type="button"  className="flex justify-center items-center gap-1 cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Probar demo sin cuenta <ArrowRight/></button>
                    </div>
                    <div className='hidden md:block'>
                        <SignIn fallbackRedirectUrl={"/Dashboard"}/>
                    </div>
                </div>
            </section>
            <section className='flex items-center justify-center gap-20 md:flex-row flex-col py-16 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Explora Ideas Públicas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 shadow-sm">
                        {mockIdeas.map((idea) => (
                            <div key={idea.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow grid grid-rows-[auto 1fr auto]">
                                <div className="p-4">

                                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                        <Lightbulb className='inline-block gap-2'/>
                                        {idea.title}
                                    </h5>
                                    <p className="text-gray-600 mb-4">
                                    {idea.description}
                                    </p>
                                </div>
                                <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex justify-between items-center">
                                    <button className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
                                        Ver detalles
                                        <ArrowRight className='inline-block'/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <SignInButton mode="modal" fallbackRedirectUrl="/Dashboard" asChild>
                          <button className='px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer'>
                            Ver más ideas
                          </button>
                        </SignInButton>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50" id="chatbot">
                <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Prueba nuestro asistente de IA</h2>
                
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 bg-indigo-600 text-white">
                    <h3 className="font-medium">Asistente de validación de ideas</h3>
                    </div>
                    
                    <div className="h-64 p-4 overflow-y-auto bg-gray-50">
                    {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-16">
                        <p>Describe tu idea de negocio y recibe feedback instantáneo</p>
                        </div>
                    ) : (
                        chatMessages.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                            </div>
                        </div>
                        ))
                    )}
                    
                    {chatAttempts >= 3 && (
                        <div className="mt-4 p-3 bg-indigo-100 text-indigo-800 rounded-lg border border-indigo-200">
                        <p className="font-medium">Regístrate gratis para continuar el análisis</p>
                        </div>
                    )}
                    </div>
                    
                    <form onSubmit={handleChatSubmit} className="p-4 border-t">
                    <div className="flex">
                        <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Describe tu idea en una frase..."
                        className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                        disabled={chatAttempts >= 3}
                        />
                        <button 
                        type="submit" 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                        disabled={chatAttempts >= 3}
                        >
                        Enviar
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </section>
            
              
              <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">Ventajas de registrarse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Feedback personalizado</h3>
              <p className="text-gray-600">Accede a análisis detallados y recomendaciones específicas para tu idea.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Historial de prácticas</h3>
              <p className="text-gray-600">Guarda todas tus ideas y revisiones para seguir tu progreso.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquareMore className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Comunidad activa</h3>
              <p className="text-gray-600">Participa en discusiones y recibe feedback de otros emprendedores.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Espacio seguro</h3>
              <p className="text-gray-600">Mantén tus ideas privadas y compártelas solo cuando estés listo.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <SignInButton mode="modal" fallbackRedirectUrl={"/Dashboard"} asChild >
              <span className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                Crear Cuenta Gratuita
              </span>
            </SignInButton>
          </div>
        </div>
      </section>
        </main>
    );
}