# Pixel Volley

Pixel Volley ist ein Arcade-Spiel für zwei Spieler die zeitgleich an einer Tastatur spielen. Dabei ist das spiel recht simpel gehalten. Die Kontrahenten spielen gegeneinander Volleyball. Wer zuerst 10 Punkte hat gewinnt. <br>
<br>

#### Author:
Florian Malitschenko<br>
<br>

#### Studiengang und Semester:
MIB 6<br>
<br>

#### Kurs:
Prima<br>
<br>

#### Kursleitung:
Jirka Dell'Oro-Friedl<br>
<br>

#### Spiel:
---> hier geht es zum [Spiel](https://swampowl.github.io/PRIMA/PixelVolley/index.html).<br>
<br>

#### SouceCode:
---> hier geht es zum [SourceCode](https://github.com/Swampowl/PRIMA/tree/master/PixelVolley/Script/Source).<br>
<br>

#### Design-Dokument:
---> hier geht es zum [Design-Dokument](https://swampowl.github.io/PRIMA/PixelVolley/Design_Document_Malitschenko.pdf).<br>
<br>

#### Steuerung:
Die Steuerung ist denkbar einfach. 

Der rote (linke) Blobb steuert sich mit WASD.<br>
Der blaue (rechte) Blobb stuert wird mit den Pfeiltasten gesteuert.<br>
<br>

#### Kriterienkatalog:


| Nr. | Kriterium  | Erklärung  |
|-----|---|---|
| 1   | Units and Positions |  Das Koordinatensystem des Spieles ist mittig angesetzt. Der Zentrumspunkt des Sichtfeldes ist dabei der Punkt (0|0|0) im Koordinatensystem. 1 beschreibt einen Meter. Die Blobbs sind somit 0,75 Meter groß. |
| 2   | Hierarchy           |  Die Welt an sich ist der oberste Graph der Hierarchie. An ihm liegen bis auf die Charaktere alle Nodes. Die Charaktere sind in einem extra Graphen, der sich in der Welt befindet, angelegt. Dies ermöglich sie unabhängig von der Welt zu verändern und schneller auf sie zugreifen zu können. |
| 3   | Editor              | Im Editor wurden die Meshes, Materials sowie Rigidbodys der Welt und Charaktere angelegt. Dies ermöglichte mir eine visuelle Grundvorstellung des Aufbaus. Jegliche Änderungen die hier während der Laufzeit vorgenommen werden, wurden per Code implementiert.   |
| 4   | Scriptcomponents    | Der Mond, der im Spiel rotiert, wird per Scriptcomponent gesteuert. Für die Umsetzung meiner Idee war dies eigentlich nicht zwingend erforderlich, daher habe ich sie nur als potentielle Lichtquelle eingefügt.  |
| 5   | Extend              | Die Spielercharaktere (Blobbs) werden in eigenen Klassen instanziiert. Hier werden die Blobbs und Ihre Animationen erstellt. Das ermöglicht, wenn gewünscht schnell neue Blobbs anzulegen und diese in die Spielszene einzufügen.  |
| 6   | Sound               | Es gibt einen Hintergrund-Soundtrack und einen „Ball-Hit“ Sound, der abgespielt wird, sobald ein Blobb den Volleyball mit dem Kopf spielt. Dieser dient der auditiven Unterstützung des Spielers.  |
| 7   | Interface           | Das Interface ist aus der Szene selbst ausgelagert und beinhaltet nur den Punktestand. Warum ausgelagert? Ich war der Meinung, dass es in der Szene zu sehr ablenken würde.  |
| 8   | Event-System        |  Es gibt einen hinterlegten Event-Listener, der Kollisionen der Rigidbodys abfängt und die Events weiterleitet. Dabei ist der „Ball-Hit“ Sound über dieses gesteuert, sowie der Punktecounter. In diesem Fall war der Eventtrigger nicht nur hilfreich, sondern auch erforderlich. |
| 9   | External Data       |  Im Ordner Script/Source liegt eine JSON-Datei mit dem Namen config.json. In dieser können die Richtwerte angepasst werden, ohne den gesamten Code durchstöbern zu müssen. In configRec.json findet man die von mit empfohlenen Werten. |
| A   | Light               | Die rotierende Sonne wurde als Lichtquelle verwendet. 
Da der Fokus des Spiels auf dem Volleyballfeld liegen soll und nicht auf den Lichteffekten im Hintergrund wurden die 
umliegenden Texturen als „ShaderLit“ angelegt, was dazu führt, dass das Ambient Light der Sonne keinen Einfluss auf 
die Lichtstimmung des Spieles nimmt. (nachträglich in readme.md geändert)  |
| B   | Physics             |  Alle Meshes besitzen Rigidbodies, mit denen kollidiert werden kann.  Zudem werden die Blobbs bewegt, indem ihnen eine Force beim Tastendruck angehängt wird. |
| C   | Net                 |  Eine Netzwerkkomponente ist nicht implementiert, da das Spiel als lokaler Multiplayer an einer Tastatur ausgelegt ist. Es ist jedoch möglich, das Spiel um diese Komponente zu erweitern. |
| D   | State Machines      |  State Machines wurden nicht implementiert. |
| E   | Animation           |  Die Animationen der Blobbs werden per Spritenodes generiert. Dies geschieht in der jeweiligen Klasse der Blobbs, um eine schnelle Erweiterung zu ermöglichen. |

