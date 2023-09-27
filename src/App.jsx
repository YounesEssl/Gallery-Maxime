import React, { useState, useEffect } from "react";
import Airtable from "airtable";
import "./App.css"; // Assurez-vous que c'est bien importé.

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    const base = new Airtable({ apiKey: 'keygxd7oW9vtlXDJu' }).base('apppkuwOSdcRy2yQV');

    base('Table 1').select({
      maxRecords: 100,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      const newPhotos = records.map(record => ({
        id: record.id,
        imageUrl: record.get('Image') && record.get('Image')[0].thumbnails.large.url
      }));

      setPhotos(newPhotos);
      fetchNextPage();
    }, function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="gallery">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card" onClick={() => setSelectedImage(photo.imageUrl)}>
            <img src={photo.imageUrl} alt="Une photo de la galerie" />
          </div>
        ))}
      </div>

      {/* Ajout de la modal pour l'image agrandie */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Image agrandie" />
        </div>
      )}
    </div>
  );
}
export default App;
