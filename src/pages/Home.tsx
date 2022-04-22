import { IonActionSheet, IonButton, IonContent, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage } from '@ionic/react';
import { useRef, useState, useEffect } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [name, setName] = useState<string>('test')
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false)
  const [isRename, setIsRename] = useState<boolean>(false)

  const showRenameInput = () => {
    console.log('rename input')
    setIsRename(true)
  }

  const showRenameInput_workaround = () => {
    console.log('rename input workaround')
    setTimeout(() => {
      setIsRename(true)
    }, 500)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItemSliding>
          <IonItem>
            {isRename ?
              <>
                <RenameInput name={name} setName={setName} />
                <IonButton onClick={() => setIsRename(false)}>Done</IonButton>
              </>
              :
              <IonLabel>{name}</IonLabel>
            }
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
              text: 'Rename',
              handler: showRenameInput
            }
          ]}
          onDidDismiss={() => setIsActionSheetOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;



interface RenameInputProps {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

const RenameInput: React.FC<RenameInputProps> = ({ name, setName }) => {
  const inputRef = useRef<HTMLIonInputElement | null>(null)
  useInputFocus(inputRef)

  return (
    <IonInput
      ref={inputRef}
      onIonBlur={() => console.log('blur')}
      value={name}
      onIonChange={e => setName(e.detail.value ?? '')}
    />
  )
}



const useInputFocus = (inputRef: React.MutableRefObject<HTMLIonInputElement | null>) => {
  // Ensure the internal `input` element is initialized before trying to focus on it
  useEffect(() => {
    const internalInputChecker = setInterval(() => {
      inputRef.current?.getInputElement()
        .then((element) => {
          if (element) {
            console.log('focus set')
            inputRef.current?.setFocus()
            clearInterval(internalInputChecker)
          }
        })
    }, 50)
    return () => {
      clearInterval(internalInputChecker)
    }
  }, [])
}
