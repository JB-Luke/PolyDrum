##   



# POLYDRUM

06/02/2019

─

Battisti Luca

Kursun Bertan

Baco Gresia

---

# Owners and Rights

The projects was designed and realized by Battisti Luca, Kursun Bertan and Baco Gresia as a master project for the Advanced Coding Tools and Methodologies course at Politecnico di Milano. The rights belong entirely to them

# Goals

The goals of this project are to overcome the limitations of the traditional drum machines, not able to provide to the musician the possibility to create a custom polyrhythm. 
With this improved version of the previous polyrithmic drum machine (available at [https://github.com/bertankursun/PoliMi_ACTM]), it is possible for the artist to manage up to six different instruments independently, which can be controlled both from the graphic interface and the microcontroller. Hopefully, this project will serve not only a creative task, but also a didactic one, allowing students to get familiar with polyrhythm itself.

# Specifics

The user interface is written in HTML and CSS, the logic in Javascript. This project includes several external libraries, that are:

  1.  microBit.js
  > to achieve Bluetooth connection between the microcontroller and the pc
  
  2. plotly.js
  > for signal visualization

3. Howler JS
> audio API  

4. math.js

5. jquery.js
> for the user interface


# Graphic Interface
    
The first usage of the drum machine comes from playing with the graphic interface. After running the program, the following interface appears:


<p align="center"><img width="700" src="https://lh3.googleusercontent.com/h29vixZV4pkX2Eyp9_MrP4d3nLwrQfzFmguobrTU3jmcD-hYjCTi8UNbJMxNmmL6ROxXkgpsBwFY"></p>

Let's analyse step by step all the functionalities of the Polydrum.

**Main controls**
On top left the the interface we find the main controls:


<p align="center"><img width=500 src="https://lh3.googleusercontent.com/xm_OqtpqQw-Dk0xYR-lFM_Pg8h_56QmNQR-hwFer0majI6Cki6-a9h0MH-8zYmWAf_Z_XO3-zm-p"></p>

One of the first parameters to set for an artist is the tempo: this is why, as a first feature, we give the chance to choose a beat (expressed in bpm), which can be faster or slower by regulating the slider. Volume can be adjusted in a similar way. By clicking playback the artist can hear the sequence of sounds as the bar slides, and the click sound can be activated in the background to have a perception of tempo itself.

**Polymetric Structure**
<p align="center"><img width=300 src="https://lh3.googleusercontent.com/3I01Y-ADiz-njWpUB5toLaWJIMhhzV5QnvY5spEZzfCUUZ5HQBNE6lcXIsV2424X_WSvJiSfpEZz"></p>
This area of the interface holds the very heart of polyrhythm. Indeed, the artist can choose his custom polyrhythm according to the Brian Ferneyhough’s notation:

**_m/n:i/j_**

where _m/n_ means m beats, each an n-th of a whole note, while _m/n:i/j_ means two rhythms fitting a measure that lasts n beats of the former and j beats of the latter, where the former rhythm repeats every m of its own beats and the latter every i of its own beats. So the overall cross-rhythm becomes _m:j_.
The software will automatically find a common tatum for all the instrument matrices.
Each part of the kit is initially assigned to signature A, but it can also be changed to put in evidence the bits related to signature B.

**Matrices**

<p align="center"><img width=1000 src="https://lh3.googleusercontent.com/E22u1i7BKaAJ-WS_njCZ-q9jDZKSlT_noXEl__KQ1sak4Wd465ggzMic-2CzIzDZKfFvVkbTe6m1"></p>

The central part of the software is where magic happens: all you need to do is click on a box to select it, and if you're not satisfied with the result you can just click it again to deactivate it. 
With the *Playback* button in the **Main controls** section you can hear the overall composition, which can be totally erased by clicking the *reset* button described in the following section.

**Additional features**
<p align="center"><img width=200 src="https://lh3.googleusercontent.com/9B79UXM4qVH2JelqtH9uQIYd2xhzrUsc1qKXvbtOO6PasigrI1THdpoCVcJYMSlo3RSbGzQTEVkc"></p>
<p align="center"><img width=400 src="https://lh3.googleusercontent.com/X6sr_Bcvkf_awNAp4EOSvauI0q8heOLp3pyCP1WLKWqbKNhLTiqzrI-HG93lSkVvgvthrD2lOvLc"></p>

These two features that can be found an the bottom of the graphic interface are extremely handy when experimenting with the composition. Depending on the instrument selected at the very bottom of the software, with _Select beats_ one can highlight the beats corresponding to a given time signature for that given instruments.
With _Shift bins_, on the other hand, we can shift in a circular and independent way, one bin at a time each matrix. This allows every kind of experiments, setting your creativity free!

# microBit pairing

 
If so far our Polydrum looked like a regular drum machine, you are about to uncover what makes it truly interesting: the microBit coupling.
A microBit is essentially a microcontroller that allows the interaction between our gestures and sound coming from the software.
Simple gestures have been implemented for each on the instruments, emulating what happens by hitting the drums with drum sticks

**Connecting the microBit**

<p align="center"><img width=400 src="https://lh3.googleusercontent.com/Hxh6fZ_JIgQmNvfp_w0WPQEM1GSu4nF4FL5Y4qx1Idqqgl63ks3khnyCSG7Yi0fBXp8M4ZPoS0VS"></p>

 The first step to exploit the gestures is to pair the device with the software through BLE connection. It is possible to set the accelerometer period for the best performances, as well as read the values for _Yaw_, _Pitch_ and _Slope_ in real time.

**Arm/Disarm function**
 <p align="center"><img width=200 src="https://lh3.googleusercontent.com/ntJ4X5CI4F-i2QtPnius_Or6MtRgkqGNEvbub75A4c5BmzO_1SnjRlijGUhOYQJGYeiX-_O4fVF6"></p>
 
The _Arm_ function enables you to record sounds through gestures once the playback is on. Its is possible to modify the track on the fly by clicking on the boxes as explained in the previous section.

For further info on the gestures implemented, please watch the explanatory video included in the project folder.
 
 

 # Conclusions and further developments
This project gave us the chance to create something that can potentially allow people with a weak musical background to create music and express themselves. 
Along with the creative side of out work, we are very proud to serve as a tool for young students and musicians like us for understanding polyrhythm and its characteristics, as this software can also be thought as a didactic interface for getting familiar with polyrhythm itself.
In adding the microBeat features, we were inspired by live performances of well known artists who, by exploting new technologies, can create sounds and merge them into music on the fly. No software is nowadays able to support musicians in a reliable and robust way, and we tried to give a contribution to a research that will (hopefully) make music accessible to everyone.

The project group:
Battisti Luca
Kursun Bertan
Baco Gresia








