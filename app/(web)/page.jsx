import Image from "next/image";

//Components

export default function Home() {
	return (
		<>
			<div className="text-stone-900 pb-10">
				<Image
					src={"/assets/Francisco-Zapata-upscaled.jpg"}
					alt="fazb-header-Polyfollia-2008-Francia"
					width={1500}
					height={1200}
					priority={true}
					className="rounded-md mx-auto rounded-t-none"
				/>
				<span className="text-stone-600 block mt-1 text-right">
					Polyfollia 2008 - Francia
				</span>

				<h1 className="text-3xl font-bold my-2 underline">
					Francisco Zapata Bello
				</h1>

				<div className="space-y-4 indent-2 tracking-wide leading-normal text-xl font-light">
					<p>
						<b>
							<strong>
								<em>Compositor, Director de Coros y Guitarrista venezolano</em>
							</strong>
						</b>
						, egresado en <strong>1977</strong> de la cátedra de Guitarra del{" "}
						Maestro{" "}
						<a
							href="https://es.wikipedia.org/wiki/Manuel_Enrique_Pérez_Díaz"
							target="_blank"
						>
							<strong>
								<em>Manuel Enrique Pérez Díaz</em>
							</strong>
						</a>
						, en la{" "}
						<a
							href="https://es.wikipedia.org/wiki/Escuela_de_Música_José_Ángel_Lamas"
							target="_blank"
						>
							<strong>
								Escuela Superior de Música de Caracas{" "}
								<em>“José Ángel Lamas”</em>
							</strong>
						</a>
						, completando sus estudios en el{" "}
						<a href="https://rcsmm.eu/" target="_blank">
							<strong>
								<em>Real Conservatorio de Madrid-España</em>
							</strong>
						</a>{" "}
						y en el{" "}
						<a
							href="https://wikimiddenbrabant.nl/Brabants_Conservatorium"
							target="_blank"
						>
							<strong>
								<em>Brabants Conservatorium de Tilburg-Holanda</em>
							</strong>
						</a>
						.
					</p>

					<p>
						Ha realizado estudios de{" "}
						<strong>
							armonía, contrapunto, fuga, composición, música del siglo XX,
							análisis musical, instrumentación y orquestación, técnicas de
							dirección orquestal y dirección coral.
						</strong>
					</p>

					<h2 className="text-2xl font-semibold underline indent-0">
						Premios y Distinciones
					</h2>

					<p>
						<strong>
							En 1981 obtuvo el premio <em>José Clemente Laya</em>
						</strong>{" "}
						por unanimidad por la obra{" "}
						<strong>
							<b>Cuarteto Para Cuerdas</b>
						</strong>
						.{" "}
						<strong>
							En 1987, el <em>Premio Municipal de Música Sinfónica</em>
						</strong>{" "}
						por la Obra <b>“Densidades”</b>.{" "}
						<strong>
							En 1989,{" "}
							<em>
								Mención Honorífica en el Concurso de Composición Sinfónica LA
								PREVISORA
							</em>
						</strong>
						, por su obra{" "}
						<strong>
							<b>El Secuestro de la Mujer de Antonio</b>
						</strong>
						, para Orquesta Sinfónica, doble coro, declamador y bailarina.
					</p>

					<p>
						<strong>
							En 1990, 2° Premio en el <em>Concurso para Música Coral</em>
						</strong>
						, por su obra
						<strong>
							<b> El Mar</b>
						</strong>
						, sobre Poesía de Vicente Aleixandre. Ha compuesto obras para
						guitarra, piano, coro, orquesta, para conjuntos de cámara y arreglos
						para voces mixtas e iguales. Su música de camara (para piano y para
						guitarra) ha sido interpretada en Venezuela, Ecuador, Japón,
						Alemania, Chile y USA.
					</p>

					<p>
						<strong>
							En Abril del 2001 su <b>Suite Variantes</b>{" "}
						</strong>{" "}
						para guitarra sola fue seleccionada en Japón para representar a
						Venezuela en el{" "}
						<a
							href="https://en.wikipedia.org/wiki/ISCM_World_Music_Days"
							target="_blank"
						>
							<strong>
								<em>ISCM World Music Days</em>
							</strong>
						</a>
						, en Yokohama, festival realizado anualmente por la{" "}
						<a href="https://iscm.org/" target="_blank">
							<strong>
								<em>ISCM - International Society for Contemporary Music</em>
							</strong>.
						</a>
					</p>

					<p>
						Su obra{" "}
						<strong>
							<b>Sincretismos</b>
						</strong>{" "}
						para orquesta de cuerdas fue seleccionada en concurso por el comité
						Artístico de la{" "}
						<a
							href="https://www.northsouthmusic.org/calendar2022.asp"
							target="_blank"
						>
							<em>
								<strong>North South Consonance Orchestra de New York</strong>
							</em>
						</a>{" "}
						y estrenada en premier mundial en la Gala de Clausura de la 42ª
						temporada bajo la Dirección de{" "}
						<strong>
							Max Lifchitz el día 09 de junio del 2022 en Saint John’s in the
							Village - New York
						</strong>.
					</p>

					<p>
						Su{" "}
						<strong>
							<b>Scherzo Latino</b>
						</strong>{" "}
						para piano fue seleccionada en concurso por el comité artístico de
						la{" "}
						<a
							href="https://www.northsouthmusic.org/calendar2023.asp"
							target="_blank"
						>
							<em>
								<strong>North South Consonance Orchestra de New York</strong>
							</em>
						</a>{" "}
						y estrenada en premier mundial a cargo del Pianista{" "}
						<strong>
							Max Lifchitz en el National Opera Center de New York el 14 de
							noviembre de 2022
						</strong>.
					</p>

					<h2 className="text-2xl font-semibold underline indent-0">
						Desarrollo Artístico
					</h2>

					<Image
						src={"/assets/Oraquesta-70s-fazb.jpg"}
						alt="fazb-orquesta"
						width={1590}
						height={980}
						priority={0}
						className="rounded-md mt-2"
					/>

					<span className="text-txMid block mt-1 text-right">
						Sala José Felix Ribas del Teatro Teresa Carreño Caracas - 1983
					</span>

					<p>
						Dirigió para proyectos especiales la{" "}
						<a
							href="https://es.wikipedia.org/wiki/Orquesta_Sinfónica_Simón_Bolívar"
							target="_blank"
						>
							<strong>Orquesta Sinfónica Simón Bolívar</strong>
						</a>{" "}
						y la <strong>Orquesta Jóvenes Arcos de Venezuela</strong> y fue
						director interino de la prestigiosa agrupación{" "}
						<strong>“Madrigalistas Vicente Emilio Sójo”.</strong>
					</p>

					<p>
						Entre 1974 y 2001 realizó intensa labor como intérprete y docente de
						la Guitarra Clásica, fundando el Dúo{" "}
						<i>Manuel Enrique Pérez Díaz</i> y el
						<i>Trío Entre Cuerdas</i>, y ejerciendo durante este periodo las
						cátedras de Teoría y Solfeo y Guitarra Clásica en{" "}
						<i>La Escuela de Música Prudencio Esaá.</i>
					</p>

					<Image
						src={"/assets/fazb-belezar-garcia-color.jpeg"}
						alt="fazb-belezar-garcia"
						width={976}
						height={1280}
						priority={0}
						className="rounded-md mt-2 sm:float-left sm:w-1/2 sm:mr-6 lg:w-1/3"
					/>

					<p>
						Entre 1994 y 2001 produjo y dirigió los programas{" "}
						<strong>“La Guitarra”</strong> y<strong>“Entre Cuerdas”</strong> en
						la{" "}
						<a
							href="https://es.wikipedia.org/wiki/Radio_Nacional_de_Venezuela"
							target="_blank"
						>
							<strong>
								<em>Radio Nacional de Venezuela</em>
							</strong>
						</a>{" "}
						y{" "}
						<a
							href="https://es.wikipedia.org/wiki/Emisora_Cultural_de_Caracas"
							target="_blank"
						>
							<strong>
								<em>La Emisora Cultural de Caracas</em>
							</strong>
						</a>
						, dedicados a la difusión de la guitarra clásica, su historia y
						evolución desde el Renacimiento hasta el siglo XX.
					</p>

					<p>
						Fue Director Titular de la Coral{" "}
						<strong>Seguros la Seguridad</strong> durante 18 años, al frente de
						la cual grabó <strong>11 discos de larga duración</strong> y durante
						40 años ha sido Director y fundador de diferentes agrupaciones
						corales de la Empresa Privada y de organismos oficiales. Su labor y
						profesionalismo en este campo de la Dirección Coral le ha merecido
						el reconocimiento{" "}
						<strong>
							entre los mejores directores de su generación en el país.
						</strong>
					</p>

					<p>
						Es Director y fundador de{" "}
						<a href="https://entrevocesvzla.wordpress.com/" target="_blank">
							<strong>
								<em>Entre Voces</em>
							</strong>
						</a>
						. Con esta agrupación graba su primer CD en 1997, titulado{" "}
						<strong>“Concierto Entre Voces”</strong>, logrando espontáneas y
						elogiosas críticas, mereciendo además{" "}
						<strong>
							la nominación para el premio <em>Casa del Artista 1998</em>,
							renglón Grupo Vocal
						</strong>
						, y en 1999 graba el segundo disco compacto con esta misma
						agrupación, titulado
						<strong> Entre Voces Volumen II</strong>, con una selección muy
						particular de la música popular urbana, que más ha influido en
						Venezuela en los últimos 40 años y que inicia un periodo de
						transición en el desarrollo de la propuesta artística de su tercer
						álbum <strong>Mi Tumbao 100 % la voz</strong>, que condensa 100 años
						de historia musical afrocaribe en arreglos y composiciones
						especialmente realizados para la agrupación en el estilo del Jazz
						Latino Vocal.
					</p>

					<p>
						En el 2007 obtiene dos importantes reconocimientos Internacionales
						al ser seleccionado{" "}
						<a href="https://entrevocesvzla.wordpress.com/" target="_blank">
							<strong>
								<em>Entre Voces</em>
							</strong>
						</a>{" "}
						entre 46 propuestas a nivel mundial, como una de las 12 agrupaciones
						invitadas especiales al festival francés{" "}
						<strong>
							<em>3rd Showcase for Singing Choir Pollyfolia - Francia 2008</em>
						</strong>{" "}
						en representación de América Latina, y la invitación especial para
						participar en el prestigioso{" "}
						<strong>
							<em>Festival de Primavera “Torre Vieja” – España 2008.</em>
						</strong>
					</p>

					<Image
						src={"/assets/paris-entrevoces.jpg"}
						alt="fazb-header-Polyfollia-2008-Francia"
						width={1728}
						height={1082}
						priority={0}
						className="rounded-md mt-2"
					/>
					<span className="text-txMid block mt-1 text-right">
						Entre Voces, Polyfollia 2008 - Francia
					</span>

					<p>
						En diciembre de 2009 recibió un nuevo reconocimiento Internacional,
						con la certificación de haber sido seleccionado{" "}
						<a href="https://entrevocesvzla.wordpress.com/" target="_blank">
							<strong>
								<em>Entre Voces</em>
							</strong>
						</a>{" "}
						como uno de los 24 elencos elegidos, de una convocatoria de 120
						agrupaciones de 40 países y de los cinco continentes, por el comité
						artístico del{" "}
						<a
							href="https://www.ifcm.net/projects/world-symposium-on-choral-music"
							target="_blank"
						>
							<strong>
								<em>
									9th World Symposium On Choral Music (WSCM) – Argentina 2011
								</em>
								.
							</strong>
						</a>
					</p>

					<p>
						Entre 2002 y 2011 fue Director titular de la{" "}
						<strong>Coral Universidad Santa María</strong> de Caracas y Director
						fundador del <strong>Ensamble CEA</strong> (Noneto Vocal). Con esta
						agrupación en Octubre del <strong>2007</strong> actuó exitosamente
						en el Festival Internacional{" "}
						<a href="https://corpacoros.org/" target="_blank">
							<strong>
								<em>CORPACOROS</em>
							</strong>
						</a>{" "}
						de Colombia y en <strong>2009</strong> culminó su primera gira
						internacional a Europa participando especialmente en el{" "}
						<a href="https://leschoeursdumercantour.fr/" target="_blank">
							<strong>
								<em>
									IV Festival Internacional Choeurs en Montagne Saint Martin
									Vésubie
								</em>
							</strong>
						</a>{" "}
						<strong>Francia</strong>, realizando además conciertos especiales en
						Paris y Madrid respectivamente con notable éxito de critica y
						publico.
					</p>

					<p>
						Ejerce la cátedra itinerante de Dirección Coral, dictando talleres
						en la Capital y en la provincia y ha sido designado jurado en
						diferentes concursos y festivales de música coral y composición
						musical, entre los que cabe destacar{" "}
						<strong>Concurso de Composición Coral Vinicio Adames</strong> –{" "}
						<strong>
							Selección de obras de la Sociedad de Música Contemporánea de
							Venezuela para el Festival Internacional de Música Contemporánea
							Alemania - 2005
						</strong>{" "}
						–{" "}
						<strong>
							Tallerista y Jurado del 8° Festival Internacional Coral D`Canto
							Estado Nueva Esparta - Venezuela 2005
						</strong>.
					</p>

					<p>
						Fue invitado al 1er Seminario Internacional{" "}
						<strong>Las Nuevas Músicas para Guitarra</strong> realizado en
						Bogotá – Colombia entre el 23 y el 30 de abril de 2014, participando
						activamente como docente, ponente y compositor, sobre su obra
						guitarristica y la música contemporánea latinoamericana. En julio de
						2015, participó como conferencista en el{" "}
						<strong>
							XIV Festival Internacional de Coros - José María Bravo Márquez
						</strong>{" "}
						de Medellín Colombia, con la ponencia:{" "}
						<strong>Del arreglo a la composición musical</strong>.
					</p>

					<p>
						Editó en edición privada y limitada su libro «Composiciones para
						voces mixtas e iguales» (2011) y{" "}
						<strong>Cinco obras originales para guitarra</strong> publicadas
						bajo el auspicio de la Fundación Vicente Emilio Sojo (Funves)
						(2013). Prepara la grabación de su obra guitarrística y la edición
						de su obra pianística.
					</p>

					<p>
						Es editor y redactor del blog{" "}
						<strong>Entre Notas y Noticulas</strong> cuya publicación periódica
						trata temas de interés musical y artístico, circunstancias y
						sensaciones de vida.
					</p>
				</div>
			</div>
		</>
	);
}