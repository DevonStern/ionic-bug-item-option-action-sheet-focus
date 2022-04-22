import { IonActionSheet, IonContent, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonPage } from '@ionic/react';
import { useRef, useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLIonInputElement | null>(null)

  const setFocus = () => {
    console.log('focus')
    inputRef.current?.setFocus()
  }

  const setFocus_workaround = () => {
    setTimeout(() => {
      console.log('focus workaround')
      inputRef.current?.setFocus()
    }, 500)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItemSliding>
          <IonItem>
            <IonInput
              ref={inputRef}
              placeholder="placeholder"
              onIonBlur={() => console.log('blur')}
            />
          </IonItem>
          <IonItemOptions side="start">
            <IonItemOption onClick={() => setIsActionSheetOpen(true)} >
              Menu
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
        <IonActionSheet
          isOpen={isActionSheetOpen}
          buttons={[
            {
              text: 'Set Focus',
              handler: setFocus
            }
          ]}
          onDidDismiss={() => setIsActionSheetOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;